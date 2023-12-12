
@app.route('/get-project-info/<id>', methods=['GET'])
def get_project(id):
    query = f'SELECT p.id_proiect, p.img, p.nume, p.status, date_format(p.data_sfarsit, "%d/%m/%y") as sfarsit,date_format(p.data_inceput,"%d/%m/%y")as inceput, c.nume as categorie, o.nume as organizator, sum(f.suma) as suma, l.strada, orase.nume as oras, t.nume as tara FROM  proiecte p  LEFT JOIN categorii c ON c.id_categorie = p.id_categorie JOIN organizatori o ON o.id_organizator = p.id_organizator LEFT JOIN finantari f ON f.id_proiect = p.id_proiect left JOIN locatie l ON l.id_proiect = p.id_proiect LEFT JOIN orase ON orase.id_oras = l.id_oras LEFT JOIN tari t ON t.id_tara = l.id_tara where p ID_proiect={id} GROUP BY  p.id_proiect, p.img, p.nume, p.status,inceput, sfarsit, categorie, organizator, strada, oras, tara order by id_proiect'
    
    result = execute_query(query)
    return jsonify(result)
