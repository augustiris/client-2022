import json
import os
from .swen_344_db_utils import exec_commit

def initializeMenu():
    file_path = os.path.join(os.path.dirname(__file__), 'data/data.json')

    with open(file_path) as file:
        data = json.load(file)

        for item in data:
            # print(data[item]['name'])

            query = """
                INSERT INTO menu (
                    id, name, category, calories, total_fat, saturated_fat,
                    trans_fat, protein, carbohydrate
                )
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                """
            exec_commit(query, (
                data[item]['id'],
                data[item]['name'],
                data[item]['category'],
                data[item]['calories'],
                data[item]['totalFat'],
                data[item]['saturatedFat'],
                data[item]['transFat'],
                data[item]['protein'],
                data[item]['carbohydrate'],
            ))
