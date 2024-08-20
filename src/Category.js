// Category.js
import React, { useState } from 'react';
import Widget from './Widget';
import { Modal, Button, Form } from 'react-bootstrap';

const Category = ({ category, categoryIndex, addWidget, removeWidget }) => {
  const [showModal, setShowModal] = useState(false);
  const [newWidgetName, setNewWidgetName] = useState('');
  const [newWidgetText, setNewWidgetText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddWidget = () => {
    setShowModal(true);
  };

  const handleSaveWidget = () => {
    const newWidget = {
      type: newWidgetName || 'Untitled Widget',
      chart_type: 'bar', // Example chart type, can be changed based on user input
      text: newWidgetText || 'No description provided',
    };
    addWidget(categoryIndex, newWidget);
    setShowModal(false);
    setNewWidgetName('');
    setNewWidgetText('');
  };

  const filteredWidgets = category.widgets.filter(widget =>
    widget.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="category">
      <div className="category-header">
        <h2>{category.name}</h2>
        <Button className="button" onClick={handleAddWidget}>+ Add Widget</Button>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search widgets..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="widgets">
        {filteredWidgets.length > 0 ? (
          filteredWidgets.map((widget, widgetIndex) => (
            <Widget
              key={widgetIndex}
              widget={widget}
              categoryIndex={categoryIndex}
              widgetIndex={widgetIndex}
              removeWidget={removeWidget}
            />
          ))
        ) : (
          <p className="no-widgets">No widgets found.</p>
        )}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Widget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formWidgetName">
            <Form.Label>Widget Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter widget name"
              value={newWidgetName}
              onChange={(e) => setNewWidgetName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formWidgetText" className="mt-3">
            <Form.Label>Widget Text</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter widget description"
              value={newWidgetText}
              onChange={(e) => setNewWidgetText(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveWidget}>
            Save Widget
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Category;
