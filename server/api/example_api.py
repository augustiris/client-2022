from flask_restful import Resource
from db.swen_344_db_utils import exec_get_all

class ExampleApi(Resource):
    def get(self):
    # NOTE: No need to replicate code; use the util function!
       result = exec_get_all("SELECT * FROM people")
       return result
