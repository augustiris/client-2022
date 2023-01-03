import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup, Form } from 'reactstrap';
import './Label.css';

const ItemDetails = ({ modal, toggle, itemId, updateItem, sections, deleteItem, data }) => {

    const getItem = () => {
        return data.filter(item => {
            return item.id === itemId
        })[0]
    }

    const getFormGroup = (title, defaultVal, name, step=null) => {
        // console.log([name, step])
        return (
            <FormGroup key={name}>
                <Label>{title}</Label>
                <Input
                    placeholder={defaultVal}
                    defaultValue={defaultVal}
                    type='text'
                    name={name}
                    step={step}
                />
            </FormGroup>
        );
    }

    const handleSubmit = e => {
        const item = getItem()
        e.preventDefault()

        const data = {
            id: item.id,
            name: item.name,
            category: item.category,
            calories: item.calories,
            totalFat: item.totalFat,
            saturatedFat: item.saturatedFat,
            transFat: item.transFat,
            protein: item.protein,
            carbohydrate: item.carbohydrate
        }

        Array.from(e.target.elements).forEach(element => {
            if (element.type !== 'button' && element.type !== 'submit') {
                if (element.value !== element.defaultValue){
                    data[element.name] = element.value
                }
            }
        });

        updateItem(item.id, data)
    }

    const getEditModal = () => {
        const item = getItem()
        // console.log(item)
        return (
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                    {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </ModalHeader>
                <Form onSubmit={handleSubmit}>
                    <ModalBody>
                        {Object.entries(item).map(section => {
                            // console.log(section[1])
                            if (section[0] !== 'id'){
                                return getFormGroup(
                                    sections[section[0]], section[1], section[0],
                                    (!isNaN(section[1]) ? "0.01": null)
                                )
                            }
                            return null
                        })}
                    </ModalBody>
                    <ModalFooter>
                        <Button type='submit' color="primary" onClick={toggle}>
                            Save
                        </Button>{' '}
                        <Button type='button' color="secondary" onClick={toggle}>
                            Cancel
                        </Button>
                        <Button type='button' color="danger" 
                            onClick={() => {deleteItem(item.id);toggle();}}>
                            Delete
                        </Button>
                    </ModalFooter>
                </Form>
            </Modal>
        );
    }

    return (  
        <div>
            {itemId !== 'test' && getEditModal()}
        </div>
    );
}

export default ItemDetails;