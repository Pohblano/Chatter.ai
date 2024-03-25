from flask import Flask
from sklearn import datasets
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier

app = Flask(__name__)

@app.route('/api/ml')
def test():
	return{'test': 'data reached'}