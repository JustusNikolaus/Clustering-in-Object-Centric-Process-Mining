import pandas
import matplotlib.pyplot as plt
from PIL import Image


# Read the .csv and convert it to .png
df = pandas.read_csv('sampledata.csv', delimiter=';', 
                     index_col=0, 
                     parse_dates=[0], dayfirst=True, 
                     names=['date','a','b','c'])
df.plot()

plt.savefig('sampledata.png')


# Show a .png file 
image = Image.open('sampledata.png')
image.show()
