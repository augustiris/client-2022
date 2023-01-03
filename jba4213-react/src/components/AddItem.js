import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup, Form } from 'reactstrap';
import './Label.css';

const AddItem = ({ modal, toggle, addItem, sections, categories }) => {

    const getFormGroup = (title, name, step=null) => {
        if (name === 'category'){
            return (
                <FormGroup key={name}>
                <Label>{title}</Label>
                    <Input type="select" name={name}>
                        {categories.map(category => (
                            <option key={category.id} value={category.value}>
                                {category.text}
                            </option>
                        ))}
                    </Input>
                </FormGroup>
            );
        }
        return (
            <FormGroup key={name}>
                <Label>{title}</Label>
                <Input
                    type='text'
                    name={name}
                    step={step}
                />
            </FormGroup>
        );
    }

    const handleSubmit = e => {
        e.preventDefault()

        const data = {
            name: 'test',
            category: 'test',
            calories: 'test',
            totalFat: 'test',
            saturatedFat: 'test', 
            transFat: 'test',
            protein: 'test',
            carbohydrate: 'test',
        }

        Array.from(e.target.elements).forEach(element => {
            if (element.type !== 'button' && element.type !== 'submit') {
                // console.log(element.name)
                data[element.name] = element.value
            }
        });
        // console.log(data)
        addItem(data)
    }

    const getAddModal = () => {
        return (
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                    Add Item
                </ModalHeader>
                <Form onSubmit={handleSubmit}>
                    <ModalBody>
                        {Object.entries(sections).map(section => getFormGroup(section[1], section[0]))}
                    </ModalBody>
                    <ModalFooter>
                        <Button type='submit' color="primary" onClick={toggle}>
                            Add
                        </Button>{' '}
                        <Button type='button' color="secondary" onClick={toggle}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Form>
            </Modal>
        );
    }

    return (  
        <div>
            {getAddModal()}
        </div>
    );
}

export default AddItem;