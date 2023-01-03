import { Label, Input, Form, FormText } from 'reactstrap';

const Menu = ({ toggle, data, category, setIsRemoving, isRemoving, setItem }) => {

    const getMenu = (category) => {
      return (
        Object.fromEntries(Object.entries(data)
          .filter(([id]) => {
            return data[id].category === category;
          }))
      )
    }

    const handleChange = e => {
        isRemoving && ( setIsRemoving(!isRemoving))
        setItem(JSON.parse(e.target.value))
    }

    return (
      <Form>
        <Label>Menu</Label>
        <Input type="select" name="select" onChange={handleChange} onDoubleClick={toggle} size='5'>
          {Object.entries(getMenu(category)).map(item => {
            return(
                <option key={item[0]} value={JSON.stringify(item[1])}>
                  {item[1].name.toLowerCase()}
                </option>
              );
          })}
        </Input>
        <FormText>
          Double click to view and edit item details
        </FormText>
      </Form>
    )
  }

  export default Menu