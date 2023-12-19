import React, { useContext, useState, useEffect } from "react";
import c from "../pages/evenimente/Eveniment.module.css";
import PopInfoMenu from "./PopInfoMenu";
import { EvenimentContext } from "../pages/evenimente/context";
import { Context } from "../context";
import { functiiTypeBD } from "../pages/Registration/models";
import axios from "axios";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the styles
import { IeditedValues } from "../pages/evenimente/models";

function InfoSection() {
  const { p, setShowMenu, showMenu, section } = useContext(EvenimentContext);
  const { userInfo } = useContext(Context);
  const {
    setEditToggle,
    editToggle,
    setEditedValues,
    editedValues,
    handleDateChange,
    handleInputChange,
    handleSaveChanges,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
  } = useContext(EvenimentContext);

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    // Apelează funcția pentru a obține lista de țări când componenta se încarcă
    getAllCountries();
  }, []);

  const getAllCountries = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/get-all-countries"
      );
      setCountries(response.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const getCitiesByCountry = async (selectedCountry: string) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/get-cities-by-country",
        {
          country_name: selectedCountry,
        }
      );
      setCities(response.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleCountryChange = (selectedCountry: string) => {
    // Apelul către backend pentru a obține lista de orașe pentru țara selectată
    getCitiesByCountry(selectedCountry);
    handleInputChange("tara", selectedCountry); // Actualizează starea pentru țară
  };

  // const handleInputChange = (field: string, value:string) => {
  //   setEditedValues((prevValues:IeditedValues|undefined) => ({
  //     ...prevValues!,
  //     [field]: value,
  //   }));
  // };

  // const handleSaveChanges = () => {

  //   setEditToggle(false);
  //   console.log(editedValues);
  // };

  // const handleDateChange = (field: string, date: Date ) => {
  //   if (date) {
  //     setEditedValues((prevValues:IeditedValues|undefined) => ({
  //       ...prevValues!,
  //       [field]: date,
  //     }));
  //   }
  // };
  // const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setENDDate] = useState(new Date());
  return (
    <>
      {!p ? (
        <div className={c.lodaing}>
          Loading...
          <div className={c["loading-spinner"]}></div>
        </div>
      ) : (
        <div className={c.section}>
          <div className={c["informatii-section"]}>
            <header className={c.header}>
              <span>{section}</span>
              <i
                className="bi bi-list"
                onClick={() => setShowMenu(!showMenu)}
              ></i>
              {showMenu && <PopInfoMenu />}
            </header>
            <div className={c["informatii"]}>
              {!editToggle && (
                <div className={c.col1}>
                  <span>Organizator:</span>
                  <span>Startul proiectului:</span>
                  <span>Sfarsitul proiectului:</span>
                  <span>Adresa locatiei:</span>
                  <span>Categoria:</span>
                  <span>Suma stransa:</span>
                </div>
              )}
              <div className={c.col2}>
                {editToggle ? (
                  <div className={c.edit}>
                    <div className={c.flex}>
                      <label className={c["loc-labels"]} htmlFor="inceput">
                        Inceput
                      </label>
                      <ReactDatePicker
                        className={c.date}
                        selected={startDate}
                        onChange={(date: Date) => {
                          setStartDate(date);
                          handleDateChange("inceput", date);
                        }}
                        dateFormat="dd/MM/yyyy"
                      />
                    </div>

                    <div className={c.flex}>
                      <label className={c["loc-labels"]} htmlFor="Sfarsit">
                        Sfarsit
                      </label>
                      <ReactDatePicker
                        className={c.date}
                        selected={endDate}
                        onChange={(date: Date) => {
                          setEndDate(date);
                          handleDateChange("sfarsit", date);
                        }}
                        dateFormat="dd/MM/yyyy"
                      />
                    </div>

                    <div className={c["edit-loc"]}>
                      <div>
                        <label className={c["loc-labels"]} htmlFor="tara">
                          Tara
                        </label>
                        <select
                          name="tara"
                          value={editedValues!.tara}
                          onChange={(e) => handleCountryChange(e.target.value)}
                        >
                          <option value="" disabled>
                            Selectează țara
                          </option>
                          {countries.map((country: any, index) => (
                            <option key={index} value={country.nume}>
                              {country.nume}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className={c["loc-labels"]} htmlFor="oras">
                          Oras
                        </label>
                        {cities && (
                          <select
                            name="oras"
                            value={editedValues!.oras}
                            onChange={(e) =>
                              handleInputChange("oras", e.target.value)
                            }
                          >
                            <option value="" disabled>
                              Selectează orașul
                            </option>
                            {cities.map((city: any, index) => (
                              <option key={index} value={city.nume}>
                                {city.nume}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>
                      <div>
                        <label className={c["loc-labels"]} htmlFor="strada">
                          Strada
                        </label>
                        <input
                          name="strada"
                          type="text"
                          value={editedValues!.strada}
                          onChange={(e) =>
                            handleInputChange("strada", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className={c.flex}>
                      <label className={c["loc-labels"]} htmlFor="categorii">
                        Categorie
                      </label>
                      <select
                        name="categorii"
                        className={c.categorii}
                        value={editedValues!.categorie}
                        onChange={(e) =>
                          handleInputChange("categorie", e.target.value)
                        }
                      >
                        <option value="Asistență medicală">
                          Asistență medicală
                        </option>
                        <option value="Social">Social</option>
                        <option value="Mediu">Mediu</option>
                        <option value="Educatie">Educație</option>
                      </select>
                    </div>
                  </div>
                ) : (
                  <>
                    <span>{p.organizator}</span>
                    <span>{p.inceput}</span>
                    <span>{p.sfarsit}</span>
                    <span>
                      str.{p.strada}, {p.oras}, {p.tara}
                    </span>
                    <span>{p.categorie}</span>
                    <span>{p.suma}MDL</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className={c["descriere-section"]}>
            <header className={c.header}>Descrierea evenimentului</header>
            <div className={c.descriere}>
              {editToggle ? (
                <textarea
                  className={c["descriere-section"]}
                  value={p.descriere}
                  onChange={(e) =>
                    handleInputChange("descriere", e.target.value)
                  }
                />
              ) : (
                <p>{p.descriere}</p>
              )}
            </div>
            {userInfo.functie === functiiTypeBD.organizatori && (
              <div className={c["save-btn-container"]}>
                {editToggle ? (
                  <button className={c["save-btn"]} onClick={handleSaveChanges}>
                    Salvează
                  </button>
                ) : (
                  <button
                    className={c["save-btn"]}
                    onClick={() => setEditToggle(true)}
                  >
                    Editează
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default InfoSection;
