from flask import Flask, jsonify, request
from flask_cors import CORS
import pymysql

app = Flask(__name__)
CORS(app)


def create_connection():
    return pymysql.connect(
        host='localhost',
        user='root',
        password='admin',
        database='voluntariat'
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
        # Handle any exceptions, log the error, and return an error message if necessary
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
    query = f'select data,suma from finantari where ID_proiect={id} order by data '
    result = execute_query(query)
    return jsonify(result)


@app.route('/get-all-projects', methods=['GET'])
def get_projects():
    query = 'SELECT p.id_proiect, p.img, p.nume, p.status, date_format(p.data_sfarsit, "%d/%m/%y") as sfarsit, c.nume as categorie, o.nume as organizator, sum(f.suma) as suma, l.strada, orase.nume as oras, t.nume as tara FROM  proiecte p  LEFT JOIN categorii c ON c.id_categorie = p.id_categorie JOIN organizatori o ON o.id_organizator = p.id_organizator LEFT JOIN finantari f ON f.id_proiect = p.id_proiect left JOIN locatie l ON l.id_locatie = p.id_locatie LEFT JOIN orase ON orase.id_oras = l.id_oras LEFT JOIN tari t ON t.id_tara = l.id_tara GROUP BY  p.id_proiect, p.img, p.nume, p.status, sfarsit, categorie, organizator, strada, oras, tara order by id_proiect'
    result = execute_query(query)
    return jsonify(result)


@app.route('/get-3-projects', methods=['GET'])
def get_3projects():
    query = 'SELECT  p.id_proiect, p.img, p.nume, p.status, date_format(p.data_sfarsit, "%d/%m/%y") as sfarsit, c.nume as categorie, o.nume as organizator, sum(f.suma) as suma, l.strada, orase.nume as oras, t.nume as tara FROM  proiecte p  LEFT JOIN categorii c ON c.id_categorie = p.id_categorie   JOIN organizatori o ON o.id_organizator = p.id_organizator  LEFT JOIN finantari f ON f.id_proiect = p.id_proiect   JOIN locatie l ON l.id_locatie = p.id_locatie LEFT JOIN orase ON orase.id_oras = l.id_oras LEFT JOIN tari t ON t.id_tara = l.id_tara GROUP BY  p.id_proiect, p.img, p.nume, p.status, sfarsit, categorie, organizator, strada, oras, tara  LIMIT 3;'
    result = execute_query(query)
    return jsonify(result)


@app.route('/get-project-info/<id>', methods=['GET'])
def get_project(id):
    query = f'SELECT p.id_proiect, p.img,p.descriere, p.nume, p.status, date_format(p.data_sfarsit, "%d/%m/%y") as sfarsit,date_format(p.data_inceput,"%d/%m/%y")as inceput, c.nume as categorie, o.nume as organizator, sum(f.suma) as suma, l.strada, orase.nume as oras, t.nume as tara FROM  proiecte p  LEFT JOIN categorii c ON c.id_categorie = p.id_categorie JOIN organizatori o ON o.id_organizator = p.id_organizator LEFT JOIN finantari f ON f.id_proiect = p.id_proiect left JOIN locatie l ON l.id_locatie = p.id_locatie LEFT JOIN orase ON orase.id_oras = l.id_oras LEFT JOIN tari t ON t.id_tara = l.id_tara where p.ID_proiect={id} GROUP BY  p.id_proiect, p.img, p.nume, p.status,inceput, sfarsit, categorie, organizator, strada, oras, tara order by id_proiect'
    result = execute_query(query)
    return jsonify(result)

@app.route('/get-project-transactions/<id>', methods=['GET'])
def get_project_transactions(id):
    query = f'select s.nume_organizatie as organizatie,sum(f.suma) as suma, date_format(f.data, "%d/%m/%y")as data from sponsori s join finantari f on f.ID_sponsor=s.id_sponsor where f.id_proiect={id} group by s.nume_organizatie,f.data'
    result = execute_query(query)
    return jsonify(result)


@app.route('/get-necesitati/<id>', methods=['GET'])
def get_necesitati(id):
    query = f'select n.necesitate as necesitate, cantitate  from necesitati n where n.id_proiect={id}'
    result = execute_query(query)
    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True)
