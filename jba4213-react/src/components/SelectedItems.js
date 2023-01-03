import { Label, Input, Form } from 'reactstrap';

const SelectedItems = ({ selectedItems, isRemoving, setIsRemoving, setItem, getInfo, toggle }) => {

    const handleChange = e => {
        !isRemoving && ( setIsRemoving(!isRemoving))
        setItem(JSON.parse(e.target.value))
    }

    return (
      <Form>
        <Label>Selected Items</Label>
        <Input type="select" name="select" size="5" onChange={handleChange} onDoubleClick={toggle}>
          {selectedItems.length > 0 && selectedItems.map(item => {
            return (
              <option key={item.data.id} value={JSON.stringify(item.data)}>
              {item.data.name} ({item.count})
              </option> 
            );
          })}
        </Input>
      </Form>
    )
  }

  export default SelectedItems