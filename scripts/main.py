
import tabula
import pandas as pd
# CONVERTING DATA TO CSV


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


# Using list(df) to get the list of all Column Names
print("check:")
print(df[0]['Unnamed: 1'])
row_replacement = df[0]['Unnamed: 1'].str.split('\r', 1)
print("replacement:")
print(row_replacement)
data = [['tom', 10], ['nick', 15], ['juli', 14]]

append_arr_test = []
i = 0
for x in row_replacement:

    append_arr_test[i] = x[0]
    if (len(x) > 1):
        print("bbblb")
    i += 1
print("finish")
print(append_arr_test)
append_arr = pd.DataFrame([[append_arr_test]])
print("finish2")
print(append_arr)
#df[0]['Unnamed: 1'] = row_replacement.str.extract(r'(,)/g', expand=True)
#check_data = df[0]['Unnamed: 1'].str.split(r'/(\\r)/g', expand=True)
#print(df[0]['Unnamed: 1'])
#df['code'] = df['TOTAL.............'].str.extract(r'\\r')
# convert PDF into CSV
#df.to_csv('test.csv', encoding='cp1252')
# save_df(df)
# print(df)
# CLEANING DATA PER CSV
# importing Dataset
#df = pd.read_csv('csv/df_name_0.csv',skiprows=[0,1,2,3,4,5])
#first_column = df.iloc[:, 0]
# print(df)
