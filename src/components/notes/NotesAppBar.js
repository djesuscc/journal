import React from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploading } from '../../actions/notes';

export const NotesAppBar = ({ date }) => {
  const noteDate = moment(date);
  const dispatch = useDispatch();
  const { active } = useSelector(state => state.notes)

  const handleSaveNote = () => {
    dispatch(startSaveNote(active))
  }

  const handleUploadPicture = () => {
    console.log("Upload")
    document.querySelector('#fileSelector').click();
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(startUploading(file));
    }
  }

  return (
    <div className="notes__app-bar">
      <span> {noteDate.format('DD MMMM YYYY')}</span>

      <input
        id="fileSelector"
        name="file"
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <div>
        <button
          onClick={handleUploadPicture}
          className="btn"
        >
          Picture
        </button>
        <button
          className="btn"
          onClick={handleSaveNote}
        >
          Save
        </button>
      </div>
    </div>
  )
}
