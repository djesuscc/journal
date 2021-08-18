import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';

export const JournalEntry = ({ id, title, body, date, url }) => {
  const dispatch = useDispatch();
  const noteDate = moment(date);

  const handleSelectNote = () => {
    dispatch(activeNote(id, {
      title,
      body,
      date,
      url,
    }))
  }

  return (
    <div className="journal__entry pointer animate__animated animate__fadeIn animate__faster" onClick={handleSelectNote}>
      { url && (<div
        className="journal__entry-picture"
        style={{
          backgroundSize: 'cover',
          backgroundImage: `url(${url})`
        }}
      />)}

      <div className="journal__entry_body">
        <p className="journal__entry-title">
          {title}
        </p>
        <p className="journal__entry-content">
          {body}
        </p>
      </div>
      <div className="journal__entry-date-box">
        <span>{noteDate.format('dddd')}</span>
        <h4>{noteDate.format('Qo')}</h4>
      </div>
    </div>
  )
}
