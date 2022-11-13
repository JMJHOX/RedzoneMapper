
import tabula

# Import the required Module
def save_df(df):
    df_size=len(df)
    for i, start in enumerate(range(0, df_size)):
        df[i].to_csv('df_name_{}.csv'.format(i))
# Read a PDF File
tables = tabula.read_pdf("TESTPDF.pdf", output_format="json",
                         pages=2, silent=True, encoding='cp1252')
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
    encoding='cp1252'
)
print(len(df))
# convert PDF into CSV
#df.to_csv('test.csv', encoding='cp1252')
save_df(df)
#print(df)
