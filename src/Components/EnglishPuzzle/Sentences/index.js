import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';

const Sentences = ({
  columnId,
  column,
  trueAnswer,
  rows,
  setRows,
  numberSentence,
  sentence,
  right,
}) => {
  const array = sentence.split(' ');

  const firstWord = (value, word, test) => {
    if ((word === value && test !== 'Words') || (array[0] === value)) {
      return 'english-puzzle__first-word';
    }
    return '';
  };

  const lastWord = (value, word, test) => {
    if ((word === value && test !== 'Words') || (array[array.length - 1] === value)) {
      return 'english-puzzle__last-word';
    }
    return '';
  };

  const getComapre = (value, word) => {
    if (parseInt(value, 10) === numberSentence + 1 && right) {
      if (trueAnswer.includes(word, 0)) {
        return 'english-puzzle__correct-answer';
      }
      return 'english-puzzle__error-answer';
    }
    return '';
  };

  return (
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
              className="english-puzzle__initial_words"
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
                        (provided) => (
                          <span
                            ref={provided.innerRef}
                            // eslint-disable-next-line react/jsx-props-no-spreading
                            {...provided.draggableProps}
                            // eslint-disable-next-line react/jsx-props-no-spreading
                            {...provided.dragHandleProps}
                            className={`english-puzzle__initial_word ${firstWord(item.content, column.items[0].content, column.name)} ${lastWord(item.content, column.items[column.items.length - 1].content, column.name)} ${getComapre(column.name, item.content)}`}
                            style={{
                              ...provided.draggableProps.style,
                            }}
                            aria-hidden="true"
                            onClick={() => {
                              const id = parseInt(columnId, 10);
                              const [destinationId, sourceId] = id === 11
                                ? [numberSentence + 1, 11]
                                : [11, numberSentence + 1];
                              const destColumn = rows[destinationId];
                              const sourceColumn = rows[sourceId];
                              const sourceItems = [...sourceColumn.items];
                              const destItems = [...destColumn.items];
                              const [removed] = sourceItems.splice(index, 1);
                              destItems.push(removed);
                              setRows({
                                ...rows,
                                [sourceId]: {
                                  ...sourceColumn,
                                  items: sourceItems,
                                },
                                [destinationId]: {
                                  ...destColumn,
                                  items: destItems,
                                },
                              });
                            }}
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
};

Sentences.propTypes = {
  column: PropTypes.objectOf(PropTypes.any).isRequired,
  columnId: PropTypes.string.isRequired,
  trueAnswer: PropTypes.arrayOf(PropTypes.any).isRequired,
  rows: PropTypes.objectOf(PropTypes.any).isRequired,
  setRows: PropTypes.func.isRequired,
  numberSentence: PropTypes.number.isRequired,
  sentence: PropTypes.string.isRequired,
  right: PropTypes.bool.isRequired,
};

export default Sentences;
