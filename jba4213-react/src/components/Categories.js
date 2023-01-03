import { Label, Input, Form } from 'reactstrap';

const Categories = ({ setCategory, categories }) => {

  return (
    <Form>
    <Label>Categories</Label>
    <Input type="select" name="select" onChange={(e) => setCategory(e.target.value)}>
      {categories.map(category => (
          <option key={category.id} value={category.value}>
              {category.text}
          </option>
      ))}
    </Input>
  </Form>
  )
}

export default Categories
