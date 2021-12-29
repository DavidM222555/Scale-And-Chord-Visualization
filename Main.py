from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
@app.route('/home')
def home_page():
    return render_template('home.html')

@app.route('/Piano-Chords')
def piano_chords():
    return render_template('piano_chords.html')

@app.route('/Piano-Scales')
def piano_scales():
    return render_template('piano_scales.html')

@app.route('/Guitar-Chords')
def guitar_chords():
    return render_template('guitar_chords.html')

@app.route('/Guitar-Scales')
def guitar_scales():
    return render_template('guitar_scales.html')
