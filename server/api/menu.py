from flask_restful import Resource
from db.swen_344_db_utils import exec_get_all, exec_commit
import json

class Menu(Resource):

    # retrive full menu from the server
    def get_menu() -> str:
        data = []
        query = """
            SELECT * FROM menu
            """
        result = exec_get_all(query, )

        for entry in result:
            data.append(dict(
                id = entry[0],
                name = entry[1],
                category = entry[2],
                calories = entry[3],
                totalFat = entry[4],
                saturatedFat = entry[5],
                transFat = entry[6],
                protein = entry[7],
                carbohydrate = entry[8],
            ))
        jdata = json.dumps(data)
        return jdata

    def get_item(id) -> str:
        data = []
        query = """
            SELECT * FROM menu
            WHERE menu.id=%s
            """
        result = exec_get_all(query, (id,))

        for entry in result:
            data.append(dict(
                id = entry[0],
                name = entry[1],
                category = entry[2],
                calories = entry[3],
                totalFat = entry[4],
                saturatedFat = entry[5],
                transFat = entry[6],
                protein = entry[7],
                carbohydrate = entry[8],
            ))
        jdata = json.dumps(data)
        return jdata

    # modify nutrition data for existing food items
    def update_item(id, name, category, calories, total_fat, saturated_fat, trans_fat, protein, carbohydrate) -> str:
        query = """
            UPDATE menu
            SET
                name=%s,
                category=%s, 
                calories=%s,
                total_fat=%s,
                saturated_fat=%s,
                trans_fat=%s, 
                protein=%s,
                carbohydrate=%s
            WHERE menu.id=%s
            """
        exec_commit(query, (name, category, calories, total_fat, saturated_fat, trans_fat, protein, carbohydrate, id,))
        data = dict(
            category=category, 
            calories=calories,
            total_fat=total_fat,
            saturated_fat=saturated_fat,
            trans_fat=trans_fat, 
            protein=protein,
            carbohydrate=carbohydrate
        )
        jdata = json.dumps(data)
        return jdata

    # create new food items in an existing category
    def add_item(name, category, calories, total_fat, saturated_fat, trans_fat, protein, carbohydrate) -> str:
        exec_commit("""
            SELECT pg_catalog.setval(pg_get_serial_sequence('menu', 'id'),
                (SELECT MAX(id) FROM menu));
            """,)

        query = """
                INSERT INTO menu (
                    name, category, calories, total_fat, saturated_fat,
                    trans_fat, protein, carbohydrate
                )
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                """
        exec_commit(query, (name, category, calories, total_fat, saturated_fat, trans_fat, protein, carbohydrate,))
        data = dict(
            name=name,
            category=category, 
            calories=calories,
            total_fat=total_fat,
            saturated_fat=saturated_fat,
            trans_fat=trans_fat, 
            protein=protein,
            carbohydrate=carbohydrate
        )
        jdata = json.dumps(data)
        return jdata

    # delete a particular food item
    def delete_item(id) -> str:
        query = """
                DELETE FROM menu
                WHERE menu.id=%s
                """
        exec_commit(query, (id,))
        data = dict(
            id=id
        )
        jdata = json.dumps(data)
        return jdata
        