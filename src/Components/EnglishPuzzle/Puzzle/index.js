import React, { useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';

const Puzzle = ({
  data,
  numberSentence,
  switchNoAnswer,
  switchCheck,
  compareWords,
  rows,
  setRows,
  trueAnswer,
  checkBtns,
}) => {
  const onDragEnd = (result, value, setValue) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if ((numberSentence + 1 === parseInt(destination.droppableId, 10)
      && numberSentence + 1 !== parseInt(source.droppableId, 10))
      || (numberSentence + 1 === parseInt(source.droppableId, 10)
      && parseInt(destination.droppableId, 10) === 11)
    ) {
      const destColumn = value[destination.droppableId];
      const sourceColumn = value[source.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setValue({
        ...value,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else if (source.droppableId === destination.droppableId) {
      const column = value[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setValue({
        ...value,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  useEffect(() => {
    if (rows[11].items.length === 0 && checkBtns !== 'noAnswer') {
      switchNoAnswer(false);
      switchCheck(true);
      const answer = [];
      const obj = rows[numberSentence + 1].items;
      const correct = data[numberSentence].textExample.replace(/(<(\/?[^>]+)>)/g, '').split(' ');
      Object.entries(obj).map(([, text]) => answer.push(text.content));
      compareWords({ true: correct, false: answer });
    }
  }, [rows]);

  return (
    <div
      className="english-puzzle"
    >
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, rows, setRows)}
      >
        {Object.entries(rows).map(([columnId, column]) => (
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
                        (provided) => (
                          <span
                            ref={provided.innerRef}
                            // eslint-disable-next-line react/jsx-props-no-spreading
                            {...provided.draggableProps}
                            // eslint-disable-next-line react/jsx-props-no-spreading
                            {...provided.dragHandleProps}
                            className={trueAnswer.includes(item.content, 0) ? 'english-puzzle__correct english-puzzle__inititial_word' : 'english-puzzle__inititial_word'}
                            style={{
                              ...provided.draggableProps.style,
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
        ))}
      </DragDropContext>
    </div>
  );
};

Puzzle.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  numberSentence: PropTypes.number.isRequired,
  // words: PropTypes.arrayOf(PropTypes.string).isRequired,
  switchNoAnswer: PropTypes.func.isRequired,
  switchCheck: PropTypes.func.isRequired,
  compareWords: PropTypes.func.isRequired,
  rows: PropTypes.objectOf(PropTypes.any).isRequired,
  setRows: PropTypes.func.isRequired,
  trueAnswer: PropTypes.arrayOf(PropTypes.string).isRequired,
  checkBtns: PropTypes.string.isRequired,
};

export default Puzzle;
