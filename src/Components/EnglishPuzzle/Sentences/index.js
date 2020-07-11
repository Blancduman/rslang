import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';

const Sentences = ({ columnId, column, words }) => (
  <div
    className="english-puzzle__sentences"
    key={columnId}
  >
    <h2
      className="english-puzzle__list_title"
    >
      {`${column.name}.`}
    </h2>
    <div
      className="english-puzzle__sentence"
    >
      <Droppable
        droppableId={columnId}
        key={columnId}
        direction="horizontal"
      >
        {(provided, snapshot) => (
          <div
              // eslint-disable-next-line react/jsx-props-no-spreading
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="english-puzzle__inititial_words"
            style={{
              background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
            }}
          >
            {column.items.map((item, index) => (
              <Draggable
                key={item.id}
                draggableId={item.id}
                index={index}
              >
                {
                  // eslint-disable-next-line no-shadow
                  (provided, snapshot) => (
                    <span
                      ref={provided.innerRef}
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      {...provided.draggableProps}
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      {...provided.dragHandleProps}
                      className="english__puzzle__inititial_word"
                      style={{
                        backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
                        ...provided.draggableProps.style,
                        width: `${100 / words.length}%`,
                      }}
                      aria-hidden="true"
                    >
                      {item.content}
                    </span>
                  )
                  }
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  </div>
);

Sentences.propTypes = {
  column: PropTypes.objectOf(PropTypes.any).isRequired,
  columnId: PropTypes.string.isRequired,
  words: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Sentences;
