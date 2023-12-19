from flask import Flask, jsonify, request
from flask_cors import CORS
import pymysql
from flask import g

app = Flask(__name__)
CORS(app)


def create_connection():
    return pymysql.connect(
        host='localhost',
        user='root',
        password='admin',
        database='voluntariat(1)'
    )


def execute_query(query):
    conn = create_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(query)
        result = cursor.fetchall()
        column_names = [desc[0] for desc in cursor.description]
        result_dict_list = [dict(zip(column_names, row)) for row in result]
    except Exception as e:
        # Log the error for debugging purposes
        print(f"Error executing query: {str(e)}")
        result_dict_list = {"error": str(e)}
    finally:
        cursor.close()
        conn.close()

    return result_dict_list



def execute_reg_query(query, params=None):
    conn = create_connection()
    cursor = conn.cursor()

    try:
        if params:
            cursor.execute(query, params)
        else:
            cursor.execute(query)

        # Commit the changes for INSERT, UPDATE, DELETE operations
        conn.commit()

        # Return success message
        result = {"message": "Operation successful"}
    except Exception as e:
        # Log the error for debugging purposes
        print(f"Error executing query: {str(e)}")
        result = {"error": str(e)}
    finally:
        cursor.close()
        conn.close()

    return result


@app.route('/reg', methods=['POST'])
def register_volunteer():
    try:
        # Get data from the request
        data = request.json
        nume = data['nume']
        prenume = data['prenume']
        email = data['email']

        # Insert data into the database using parameterized query
        query = "INSERT INTO voluntari (nume, prenume, email) VALUES (%s, %s, %s)"
        execute_query(query, (nume, prenume, email))

        # Return a success message
        return jsonify({"message": "Volunteer registered successfully"})

    except Exception as e:
        # Handle any exceptions, log the error, and return an error message if necessaryn
        return jsonify({"error": str(e)})

@app.route('/login', methods=['POST'])
def login_user():
    try:
        data = request.json
        functie = data.get('functie', '')
        email = data.get('email', '')
        password = data.get('password', '')

        if functie not in ['voluntari', 'organizatori', 'sponsori']:
            return jsonify({"error": "Invalid 'functie' value"}), 400  # 400 Bad Request

        if functie == 'voluntari':
            query = f"SELECT * FROM voluntari WHERE email = '{email}' AND password = '{password}'"
            result = execute_query(query)
        elif functie == 'organizatori':
            query = f"SELECT * FROM organizatori WHERE email = '{email}' AND password = '{password}'"
            result = execute_query(query)
        elif functie == 'sponsori':
            query = f"SELECT * FROM sponsori WHERE email = '{email}' AND password = '{password}'"
            result = execute_query(query)

        if result:
            return jsonify({"message": "Login successful"}), 200  # 200 OK
        else:
            return jsonify({"error": "Invalid credentials"}), 401  # 401 Unauthorized

    except Exception as e:
        return jsonify({"error": str(e)}), 500  # 500 Internal Server Error



@app.route('/register', methods=['POST','GET'])
def register_user():
    try:
        data = request.json
        functie = data.get('functie', '')
        nume = data.get('nume', '')
        prenume = data.get('prenume', '')
        email = data.get('email', '')
        telefon = data.get('telefon', '')
        nume_organizatie = data.get('numeOrganizatie', '')
        cont = data.get('cont', '')
        password=data.get('password','')

        if functie not in ['voluntari', 'organizatori', 'sponsori']:
            return jsonify({"error": "Invalid 'functie' value"})

        if functie == 'voluntari':
            query = f"INSERT INTO voluntari (nume, prenume, email, telefon, password) VALUES ('{nume}','{prenume}','{email}','{telefon}','{password}')"
            result = execute_reg_query(query)
        if functie == 'organizatori':
            query = f"INSERT INTO organizatori (nume, prenume, email, telefon, password) VALUES ('{nume}','{prenume}','{email}','{telefon}','{password}')"
            result = execute_reg_query(query)
        if functie == 'sponsori':
            query = f"INSERT INTO sponsori (nume_organizatie, email, cont_bancar, password) VALUES ('{nume_organizatie}','{email}','{cont}','{password}')"
            result = execute_reg_query(query)

        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)})


@app.route('/get-all-info', methods=['GET'])
def get_info():
    query = 'select  (select count(*) from voluntari) AS numar_voluntari, (select count(*) from proiecte) AS numar_proiecte, (select sum(suma)from finantari) as suma_totala_proiecte'
    result = execute_query(query)
    return jsonify(result)


@app.route('/get-money/<id>', methods=['GET'])
def get_money(id):
    query = f'SELECT data, SUM(suma) as suma FROM finantari WHERE ID_proiect = {id} GROUP BY data ORDER BY data;'
    result = execute_query(query)
    return jsonify(result)


@app.route('/get-all-projects', methods=['GET'])
def get_projects():
    query = 'SELECT p.id_proiect, p.img, p.nume, p.status, date_format(p.data_sfarsit, "%d/%m/%y") as sfarsit, c.nume as categorie, o.nume as organizator, sum(f.suma) as suma, l.strada, orase.nume as oras, t.nume as tara FROM  proiecte p  LEFT JOIN categorii c ON c.id_categorie = p.id_categorie JOIN organizatori o ON o.id_organizator = p.id_organizator LEFT JOIN finantari f ON f.id_proiect = p.id_proiect left JOIN locatie l ON l.id_locatie = p.id_locatie LEFT JOIN orase ON orase.id_oras = l.id_oras LEFT JOIN tari t ON t.id_tara = l.id_tara GROUP BY  p.id_proiect, p.img, p.nume, p.status, sfarsit, categorie, organizator, strada, oras, tara order by id_proiect'
    result = execute_query(query)
    return jsonify(result)

@app.route('/get-org-projects', methods=['POST'])
def get_org_projects():
    data = request.get_json() 
    id = data.get('id', '')
    query = f'SELECT p.id_proiect, p.img, p.nume, p.status, date_format(p.data_sfarsit, "%d/%m/%y") as sfarsit, c.nume as categorie, o.nume as organizator, sum(f.suma) as suma, l.strada, orase.nume as oras, t.nume as tara FROM  proiecte p  LEFT JOIN categorii c ON c.id_categorie = p.id_categorie JOIN organizatori o ON o.id_organizator = p.id_organizator LEFT JOIN finantari f ON f.id_proiect = p.id_proiect left JOIN locatie l ON l.id_locatie = p.id_locatie LEFT JOIN orase ON orase.id_oras = l.id_oras LEFT JOIN tari t ON t.id_tara = l.id_tara where o.id_organizator={id} GROUP BY  p.id_proiect, p.img, p.nume, p.status, sfarsit, categorie, organizator, strada, oras, tara order by id_proiect '
    result = execute_query(query)
    return jsonify(result)


@app.route('/get-3-projects', methods=['GET'])
def get_3projects():
    query = 'SELECT  p.id_proiect, p.img, p.nume, p.status, date_format(p.data_sfarsit, "%d/%m/%y") as sfarsit, c.nume as categorie, o.nume as organizator, sum(f.suma) as suma, l.strada, orase.nume as oras, t.nume as tara FROM  proiecte p  LEFT JOIN categorii c ON c.id_categorie = p.id_categorie   JOIN organizatori o ON o.id_organizator = p.id_organizator  LEFT JOIN finantari f ON f.id_proiect = p.id_proiect   JOIN locatie l ON l.id_locatie = p.id_locatie LEFT JOIN orase ON orase.id_oras = l.id_oras LEFT JOIN tari t ON t.id_tara = l.id_tara GROUP BY  p.id_proiect, p.img, p.nume, p.status, sfarsit, categorie, organizator, strada, oras, tara  LIMIT 3;'
    result = execute_query(query)
    return jsonify(result)


@app.route('/get-project-info/<id>', methods=['GET'])
def get_project(id):
    query = f'SELECT p.id_proiect, p.img,p.descriere, p.nume, p.status, date_format(p.data_sfarsit, "%d-%m-%Y") as sfarsit,date_format(p.data_inceput,"%d-%m-%Y")as inceput, c.nume as categorie, o.nume as organizator, sum(f.suma) as suma, l.strada, orase.nume as oras, t.nume as tara FROM  proiecte p  LEFT JOIN categorii c ON c.id_categorie = p.id_categorie JOIN organizatori o ON o.id_organizator = p.id_organizator LEFT JOIN finantari f ON f.id_proiect = p.id_proiect left JOIN locatie l ON l.id_locatie = p.id_locatie LEFT JOIN orase ON orase.id_oras = l.id_oras LEFT JOIN tari t ON t.id_tara = l.id_tara where p.ID_proiect={id} GROUP BY  p.id_proiect, p.img, p.nume, p.status,inceput, sfarsit, categorie, organizator, strada, oras, tara order by id_proiect'
    result = execute_query(query)
    return jsonify(result)

@app.route('/get-project-transactions/<id>', methods=['GET'])
def get_project_transactions(id):
    query = f'select s.nume_organizatie as organizatie,sum(f.suma) as suma, date_format(f.data, "%d/%m/%y")as data from sponsori s join finantari f on f.ID_sponsor=s.id_sponsor where f.id_proiect={id} group by s.nume_organizatie,f.data order by f.data desc'
    result = execute_query(query)
    return jsonify(result)


@app.route('/get-necesitati/<id>', methods=['GET'])
def get_necesitati(id):
    query = f'select n.necesitate as necesitate, cantitate  from necesitati n where n.id_proiect={id}'
    result = execute_query(query)
    return jsonify(result)



@app.route('/user-info', methods=['POST'])
def get_profile():
    data = request.get_json() 
    email = data.get('email', '')
    functie = data.get('functie', '')
    
    if functie=='organizatori':
        print(functie)
        query = f'SELECT  organizatori.id_organizator as id,organizatori.nume, organizatori.prenume, organizatori.telefon, organizatori.likeuri, organizatori.email, (SELECT COUNT(*) FROM proiecte WHERE proiecte.id_organizator = organizatori.id_organizator) as numar_proiecte FROM organizatori WHERE organizatori.email ="{email}"'
        result = execute_query(query)
        return jsonify(result)
    if(functie=='sponsori'):
        query = f'SELECT  sponsori.id_sponsor AS id, sponsori.nume_organizatie AS nume, sponsori.likeuri, sponsori.email, COUNT(DISTINCT finantari.id_proiect) AS numar_proiecte, sum(finantari.suma) as suma_donata FROM sponsori LEFT JOIN finantari ON sponsori.id_sponsor = finantari.id_sponsor WHERE sponsori.email ="{email}" GROUP BY sponsori.id_sponsor , sponsori.nume_organizatie , sponsori.likeuri , sponsori.email;'
        result = execute_query(query)
        return jsonify(result)
    return jsonify({'nu sa gasit nimic':''})

    

    # If none of the conditions are met, return a default response
    # return jsonify({"error": "Invalid function type or email"})



@app.route('/get-all-countries', methods=['GET'])
def get_all_countries():
    query = 'SELECT DISTINCT nume FROM tari'
    result = execute_query(query)
    return jsonify(result)


@app.route('/get-cities-by-country', methods=['POST'])
def get_cities_by_country():
    data = request.json
    country_name = data.get('country_name', '')
    
    query = f'SELECT o.nume FROM orase o JOIN tari t ON o.id_Tara = t.ID_tara WHERE t.nume = "{country_name}"'
    result = execute_query(query)
    return jsonify(result)



@app.route('/update-proiect/<int:id>', methods=['PUT'])
def update_proiect(id):
    try:
        # Get data from the request
        data = request.json
        inceput = data['inceput']
        sfarsit = data['sfarsit']
        strada = data['strada']
        oras = data['oras']
        tara = data['tara']
        categorie = data['categorie']
        descriere = data['descriere']

        # Update the event in the database using parameterized query
        query = """
        UPDATE proiecte
        SET inceput = %s, sfarsit = %s, strada = %s, oras = %s, tara = %s, categorie = %s, descriere = %s
        WHERE id = %s
        """
        params = (inceput, sfarsit, strada, oras, tara, categorie, descriere, id)
        execute_reg_query(query, params)

        # Return a success message
        return jsonify({"message": "Event updated successfully"})

    except Exception as e:
        # Handle any exceptions, log the error, and return an error message if necessary
        return jsonify({"error": str(e)})


@app.route('/sponsor-info', methods=['POST'])
def get_sponsor_id():
    data = request.get_json() 
    email = data.get('email', '')
    query = f'SELECT  sponsori.id_sponsor as id FROM sponsori where email ="{email}"'
    result = execute_query(query)
    return jsonify(result)

# @app.route('/sponsorizare', methods=['POST'])
# def sponsorizeaza():
#     try:
#         data = request.get_json() 
#         id_proiect = data.get('id_proiect', '')
#         id_sponsor = data.get('id_sponsor', '')
#         suma = data.get('suma', '')
        
#         query = f'INSERT INTO finantari (id_proiect, id_sponsor, suma, data) values ({id_proiect}, {id_sponsor}, {suma}, current_Date())'
#         result = execute_query(query)
        
#         if result is not None:
#             return jsonify({'success': True})
#         else:
#             return jsonify({'error': 'Failed to insert data into the database'})
    
#     except Exception as e:
#         return jsonify({'error': str(e)})


from datetime import date

@app.route('/sponsorizare', methods=['POST'])
def sponsorizeaza():
    try:
        data = request.json
        id_proiect = int(data.get('id_proiect', -1))
        id_sponsor = int(data.get('id_sponsor', -1))
        suma = int(data.get('suma', -1))

        if id_proiect == -1 or id_sponsor == -1 or suma == -1:
            raise ValueError("Invalid or missing input data")

        query = 'INSERT INTO finantari (id_proiect, id_sponsor, suma, data) VALUES (%s, %s, %s, %s)'
        current_date = date.today().isoformat()
        params = (id_proiect, id_sponsor, suma, current_date)

        result = execute_reg_query(query, params)

        if result is not None:
            print(f'Database insertion result: {result}')
            return jsonify({'success': True})
        else:
            raise ValueError('Failed to insert data into the database')

    except Exception as e:
        print(f'Error during processing: {e}')
        return jsonify({"error": str(e)})


def execquer(query, params=None):
    connection = None
    result = None

    try:
        connection = create_connection()  # înlocuiește cu funcția ta de conectare la baza de date
        with connection.cursor() as cursor:
            if params:
                cursor.execute(query, params)
            else:
                cursor.execute(query)
            result = cursor.fetchall()

    except Exception as e:
        print(f"Error executing query: {str(e)}")

    finally:
        if connection:
            connection.close()

    return result



@app.route('/updateProject/<int:id>', methods=['POST'])
def update_project(id):
    try:
        # Get data from the request
        data = request.json
        inceput = data.get('inceput', '')
        sfarsit = data.get('sfarsit', '')
        strada = data.get('strada', '')
        oras = data.get('oras', '')
        tara = data.get('tara', '')
        categorie = data.get('categorie', '')
        descriere = data.get('descriere', '')
        nume = data.get('nume', '')
        status = data.get('status', '')

        # Start a transaction
        g.db = create_connection()
        cursor = g.db.cursor()

        # Update location information
        query_locatie = """
            UPDATE locatie
            SET ID_oras = (SELECT id_oras FROM orase WHERE nume=%s),
                ID_tara = (SELECT id_tara FROM tari WHERE nume=%s),
                strada = %s
            WHERE id_locatie = (SELECT ID_locatie FROM proiecte WHERE ID_proiect = %s)
        """
        params_locatie = (oras, tara, strada, id)
        cursor.execute(query_locatie, params_locatie)

        # Update project information
        query_proiect = """
            UPDATE proiecte
            SET data_inceput = %s,
                data_sfarsit = %s,
                id_categorie = (SELECT id_categorie FROM categorii WHERE nume=%s),
                descriere = %s,
                status = %s,
                nume = %s
            WHERE id_proiect = %s
        """
        params_proiect = (inceput, sfarsit, categorie, descriere, status, nume, id)
        cursor.execute(query_proiect, params_proiect)

        # Commit the transaction
        g.db.commit()

        # Return a success message
        return jsonify({"message": "Proiectul a fost actualizat cu succes"})

    except Exception as e:
        # Rollback in case of an error
        g.db.rollback()
        return jsonify({"error": str(e)})

    finally:
        # Close the database connection
        if g.db:
            g.db.close()

if __name__ == "__main__":
    app.run(debug=True)
