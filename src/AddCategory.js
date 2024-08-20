import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddCategory = ({ categories, setCategories }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [checkedWidgets, setCheckedWidgets] = useState([]);

  useEffect(() => {
    if (categories.length > 0) {
      setCheckedWidgets(
        categories[selectedCategoryIndex]?.widgets.map((widget) => widget.type) || []
      );
    }
  }, [selectedCategoryIndex, categories]);

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const handleCategoryChange = (e) => {
    setSelectedCategoryIndex(Number(e.target.value));
  };

  const handleCheckboxChange = (e) => {
    const widgetType = e.target.value;
    const isChecked = e.target.checked;

    setCheckedWidgets((prevChecked) =>
      isChecked
        ? [...prevChecked, widgetType]
        : prevChecked.filter((type) => type !== widgetType)
    );
  };

  const handleSave = () => {
    const updatedCategories = [...categories];
    const selectedCategory = updatedCategories[selectedCategoryIndex];

    selectedCategory.widgets = selectedCategory.widgets.filter((widget) =>
      checkedWidgets.includes(widget.type)
    );

    setCategories(updatedCategories);
    handleModalClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleModalShow}>
        Manage Categories
      </Button>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Manage Widgets in Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formCategorySelect">
            <Form.Label>Select Category</Form.Label>
            <Form.Control
              as="select"
              value={selectedCategoryIndex}
              onChange={handleCategoryChange}
            >
              {categories.map((category, index) => (
                <option key={index} value={index}>
                  {category.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Widgets</Form.Label>
            {categories[selectedCategoryIndex]?.widgets.map((widget, index) => (
              <Form.Check
                key={index}
                type="checkbox"
                label={widget.type}
                value={widget.type}
                checked={checkedWidgets.includes(widget.type)}
                onChange={handleCheckboxChange}
              />
            ))}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddCategory;
