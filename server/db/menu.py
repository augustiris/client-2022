from .swen_344_db_utils import exec_sql_file
from .init_menu import initializeMenu

def rebuild_tables() -> None:
    sql_path = 'server/db/nutrition.sql'
    exec_sql_file(sql_path)

def seed_data() -> None:
    initializeMenu()