from flask import Flask, render_template, request, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///songs.db'

db = SQLAlchemy(app)

# Song model
class Song(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    artist = db.Column(db.String(100), nullable=False)
    audio_file = db.Column(db.String(100), nullable=False)

# Playlist model
class Playlist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    songs = db.relationship('Song', secondary='playlist_song', backref=db.backref('playlists', lazy='dynamic'))

# Association table for many-to-many relationship between Playlist and Song
playlist_song = db.Table('playlist_song',
    db.Column('playlist_id', db.Integer, db.ForeignKey('playlist.id')),
    db.Column('song_id', db.Integer, db.ForeignKey('song.id'))
)

# WTForms for song submission
class SongForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    artist = StringField('Artist', validators=[DataRequired()])
    audio_file = StringField('Audio File URL', validators=[DataRequired()])
    submit = SubmitField('Submit')

# WTForms for playlist creation
class PlaylistForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    submit = SubmitField('Create Playlist')

# Routes
@app.route('/', methods=['GET', 'POST'])
def index():
    song_form = SongForm()
    playlist_form = PlaylistForm()
    
    if request.method == 'POST':
        if song_form.validate_on_submit():
            new_song = Song(title=song_form.title.data, artist=song_form.artist.data, audio_file=song_form.audio_file.data)
            db.session.add(new_song)
            db.session.commit()
            flash('Song added successfully!', 'success')
            return redirect(url_for('index'))
        elif playlist_form.validate_on_submit():
            new_playlist = Playlist(name=playlist_form.name.data)
            db.session.add(new_playlist)
            db.session.commit()
            flash('Playlist created successfully!', 'success')
            return redirect(url_for('index'))
    
    songs = Song.query.all()
    playlists = Playlist.query.all()
    
    return render_template('index.html', song_form=song_form, playlist_form=playlist_form, songs=songs, playlists=playlists)

@app.route('/add-to-playlist/<int:song_id>/<int:playlist_id>', methods=['POST'])
def add_to_playlist(song_id, playlist_id):
    song = Song.query.get_or_404(song_id)
    playlist = Playlist.query.get_or_404(playlist_id)
    
    playlist.songs.append(song)
    db.session.commit()
    
    flash('Song added to playlist successfully!', 'success')
    return redirect(url_for('index'))

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
