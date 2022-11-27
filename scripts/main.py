
import tabula
import pandas as pd


def clean_data(row):

    row_replacement = row.fillna('').str.split('\r', 1)
    row_cleaned = []
    for x in row_replacement:
        if (len(x) > 1):
            separate_date_1 = ''.join(x[0])
            separate_date_2 = ''.join(x[1])
            row_cleaned.append(separate_date_1)
            row_cleaned.append(separate_date_2)
        if (len(x) == 1):
            row_cleaned.append(''.join(x))
    return row_cleaned


# Rating from 0 to 3
def rate_province(provinces_data):
    row_rated = []
    for row in provinces_data.itertuples():
        row_value = int(row[2])
        if (row_value == 0):
            row_rated.append(0)
        if (row_value >= 1 and row_value < 5):
            row_rated.append(1)
        if (row_value >= 5 and row_value < 10):
            row_rated.append(2)
        if (row_value >= 10):
            row_rated.append(3)
    print(len(row_rated))
    return row_rated


def save_df(df):
    df_size = len(df)
    for i, start in enumerate(range(0, df_size)):
        df[i].to_csv('csv/df_name_{}.csv'.format(i))


# Area : Top Left wide column
# Read a PDF File
tables_1 = tabula.read_pdf("TESTPDF.pdf",  multiple_tables=True,
                           pages="1",
                           silent=True,
                           encoding='cp1252',
                           area=[150, 28.20, 315, 170], guess=False, lattice=True)
tables_2 = tabula.read_pdf("TESTPDF.pdf",  multiple_tables=True,
                           pages="2",
                           silent=True,
                           encoding='cp1252',
                           area=[150, 28.20, 415, 130], guess=False, lattice=True)
tables_3 = tabula.read_pdf("TESTPDF.pdf",  multiple_tables=True,
                           pages="4",
                           silent=True,
                           encoding='cp1252',
                           area=[130, 30.20, 415, 150], guess=False, lattice=True)
tables_list = [tables_1, tables_2, tables_3]

# Cleaning and generating data
processed_provinces = []
processed_values = []
rated_provinces = []
# print(tables_1[0])
for table in tables_list:
    counter = 1
    for column in table[0].columns:
        if (counter == 2):
            processed_values += clean_data(table[0][column])
            counter = counter + 1
        if (counter == 1):
            processed_provinces += clean_data(table[0][column])
            counter = counter + 1

constructed_data = pd.DataFrame(
    {'province': processed_provinces, 'value': processed_values})
rated_provinces = rate_province(constructed_data)
finished_conv = pd.DataFrame({'provinces': processed_provinces, 'total': processed_values,
                              'violence_rating': rated_provinces})
finished_conv.to_json("province-rating.json", orient='records')
