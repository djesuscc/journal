import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar';

export const NoteScreen = () => {

  const dispatch = useDispatch()
  const { active } = useSelector(state => state.notes);
  const { id, date, url } = active;
  const { values, handleInputChange, reset } = useForm(active);
  let activeId = useRef(id);

  useEffect(() => {
    if (id !== activeId.current) {
      reset()
      activeId.current = id
    }
  }, [id, reset])

  useEffect(() => {
    dispatch(activeNote(values.id, { ...values }))
  }, [dispatch, values])

  const handleDelete = () => {
    dispatch(startDeleting(id))
  }

  return (
    <div className="notes__main-content">
      <NotesAppBar date={date} />
      <div className="notes__content">
        <input
          type="text"
          placeholder="Some awesome title"
          className="notes__title-input"
          autoComplete="off"
          autoFocus="on"
          name="title"
          value={values.title}
          onChange={handleInputChange}
        />

        <textarea
          placeholder="What happened today"
          className="notes__textarea"
          name="body"
          value={values.body}
          onChange={handleInputChange}
        ></textarea>
        {
          url && (<div className="notes__image">
            <img
              src={url}
              alt="landscape"
            />
          </div>)
        }
      </div>
      <button
        className="btn btn-danger"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  )
}
