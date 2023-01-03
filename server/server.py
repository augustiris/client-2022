from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS

from api.example_api import ExampleApi
from api.menu import Menu

from db.swen_344_db_utils import exec_sql_file
from db.init_menu import initializeMenu

app = Flask(__name__) #create Flask instance
CORS(app) #Enable CORS on Flask server to work with Nodejs pages
api = Api(app) #api router

api.add_resource(ExampleApi,'/example_api')
api.add_resource(Menu,'/')

@app.route('/menu', methods=['GET'])
def get_menu():
    return Menu.get_menu()

# for testing
@app.route('/menu/item/<id>', methods=['GET'])
def get_item(id):
    return Menu.get_item(id)

@app.route('/menu/update/<id>', methods=['PUT'])
def update_item(id):
    data = request.get_json()
    
    return Menu.update_item(id,
        data['name'],
        data['category'],
        data['calories'],
        data['totalFat'],
        data['saturatedFat'],
        data['transFat'],
        data['protein'],
        data['carbohydrate']
    )

@app.route('/menu/add', methods=['POST'])
def add_item():
    data = request.get_json()
    
    return Menu.add_item(
        data['name'],
        data['category'],
        data['calories'],
        data['totalFat'],
        data['saturatedFat'],
        data['transFat'],
        data['protein'],
        data['carbohydrate']
    )

@app.route('/menu/delete/<id>', methods=['DELETE'])
def delete_item(id):
    return Menu.delete_item(id)

if __name__ == '__main__':
    print("Loading db")
    exec_sql_file('/server/api/people.sql')
    exec_sql_file('server/db/nutrition.sql')
    initializeMenu()
    print("Starting flask")
    app.run(debug=True), #starts Flask
