
import tabula
import pandas as pd


def clean_data(row):
    row_replacement = row.str.split('\r', 1)
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


# Rating from 0 to 7
def rate_province(provinces_row):
    row_rated = []
    for row in provinces_row:
        row_value = int(row)
        if (row == 0):
            row_rated.append(0)
        if (row_value >= 1 and row_value <= 5):
            row_rated.append(1)
        if (row_value >= 5 and row_value <= 10):
            row_rated.append(2)
        if (row_value >= 10):
            row_rated.append(3)
    return row_rated


def save_df(df):
    df_size = len(df)
    for i, start in enumerate(range(0, df_size)):
        df[i].to_csv('csv/df_name_{}.csv'.format(i))


# Read a PDF File
tables = tabula.read_pdf("TESTPDF.pdf", output_format="json",
                         pages=[1], silent=True, encoding='cp1252', area=[150, 28.20, 315, 756.02], guess=False, lattice=True)
# print(tables)
top = tables[0]["top"]
left = tables[0]["left"]
bottom = tables[0]["height"] + top
right = tables[0]["width"] + left
# Expand location borders slightly:
test_area = [top - 20, left - 20, bottom + 10, right + 10]
df = tabula.read_pdf(
    "TESTPDF.pdf",
    multiple_tables=True,
    pages="all",
    silent=True,
    area=test_area,
    encoding='cp1252',

    guess=False,
    lattice=True
)

# Cleaning and generating data
processed_data = []
rated_provinces = []
for column in df[0].columns:
    processed_data.append(clean_data(df[0][column]))


rated_provinces = rate_province(processed_data[1])

append_arr = pd.DataFrame({'provinces': processed_data[0], 'total': processed_data[1],
                           'violence_rating': rated_provinces})
print("finish2", append_arr)
# convert PDF into CSV
append_arr.to_json("pandita.json",orient='records')
#append_arr.to_csv('test.csv', encoding='cp1252')

#''.join([''.join(l) for l in  df[0]['Unnamed: 1'].str.split('\r', 1)])
#df[0]['Unnamed: 1'].str.split('\r', 1)


#results= clean_data(df[0]['Unnamed: 1'])
#
# print("finish",processed_data)
#df[0]['Unnamed: 1'] = row_replacement.str.extract(r'(,)/g', expand=True)
#check_data = df[0]['Unnamed: 1'].str.split(r'/(\\r)/g', expand=True)
#print(df[0]['Unnamed: 1'])
#df['code'] = df['TOTAL.............'].str.extract(r'\\r')

# save_df(df)
# print(df)
# CLEANING DATA PER CSV
# importing Dataset
#df = pd.read_csv('csv/df_name_0.csv',skiprows=[0,1,2,3,4,5])
#first_column = df.iloc[:, 0]
# print(df)
