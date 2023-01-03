import unittest
from tests.rest_utils import assert_sql_count
from server.db.menu import rebuild_tables, seed_data

class TestMenuData(unittest.TestCase):

    def test_rebuild_tables(self):
        """Rebuild the tables"""
        rebuild_tables()
        assert_sql_count(self, "SELECT * FROM menu", 0)

    def test_rebuild_tables_is_idempotent(self):
        """Drop and rebuild the tables twice"""
        rebuild_tables()
        rebuild_tables()
        assert_sql_count(self, "SELECT * FROM menu", 0)

    def test_seed_data_works(self):
        """Attempt to insert the seed data"""
        rebuild_tables()
        seed_data()
        assert_sql_count(self, "SELECT * FROM menu", 25)

    if __name__ == '__main__':
        unittest.main()
        