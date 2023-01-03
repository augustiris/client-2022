import { useState } from 'react';
import { Button, Row } from 'reactstrap';

import './App.css';
import './components/Label.css';

import Categories from './components/Categories';
import Menu from './components/Menu';
import SelectedItems from './components/SelectedItems';
import NutritionLabel from './components/NutritionLabel';
import ProgressBar from './components/ProgressBar';
import ItemDetails from './components/ItemDetails';
import AddItem from './components/AddItem';

function App({ data, deleteItem, updateItem, addItem }) {
  
  const [detailsModal, setDetailsModal] = useState(false);
  const toggleDetails = () => setDetailsModal(!detailsModal);
  const [addModal, setAddModal] = useState(false);
  const toggleAdd = () => setAddModal(!addModal);
  
  const [isRemoving, setIsRemoving] = useState(false)
  const [selected, setSelected] = useState({
    id: 'test',
    name: 'test',
    category: 'test',
    calories: 'test',
    totalFat: 'test',
    saturatedFat: 'test', 
    transFat: 'test',
    protein: 'test',
    carbohydrate: 'test',
  })
  const [selectedItems, setSelectedItems] = useState([])

  const [category, setCategory] = useState()
  const categories = [
    {
      id: 0,
      value: '',
      text: ''
    },
    {
      id: 1,
      value: 'Proteins',
      text: 'Protein'
    },
    {
      id: 2,
      value: 'Fruits',
      text: 'Fruits'
    },
    {
      id: 3,
      value: 'Vegetables',
      text: 'Vegetables'
    },
    {
      id: 4,
      value: 'Dairy', 
      text: 'Dairy'
    },
    {
      id: 5,
      value: 'Grains',
      text: 'Grain'
    },
  ];

  const sections = {
    name: 'Name',
    category: 'Category',
    calories: 'Calories',
    totalFat: 'Total Fat',
    saturatedFat: 'Saturated Fat',
    transFat: 'Trans Fat',
    protein: 'Protein',
    carbohydrate: 'Carbohydrate',
  }

  const removeItemFromMenu = () => {
    const id = selected.id
    removeFromSelectedItems(true)
    setSelected({id: 'test',})
    deleteItem(id)
  }

  const updateItemFromMenu = (id, body) => {
    updateItem(id, body)
  }

  const addItemToMenu = (body) => {
    addItem(body)
  }

  const getItemInfo = (menuId) => {
    return (
      Object.fromEntries(Object.entries(data)
      .filter(([id]) => {
        return data[id].id === Number(menuId)
      }))
    );
  }

  const addToSelectedItems = () => {
    const newSelected = selectedItems.slice()
    const index = selectedItems.findIndex(item => {
      return item.data.id === selected.id;
    })
    
    if(index !== -1){
      newSelected[index].count = selectedItems[index].count+1
    }
    else{
      const newItem = {
        data: selected,
        count: 1
      }
      newSelected.push(newItem)
    }
    //console.log(newSelected)
    setSelectedItems(newSelected)
  }

  const removeFromSelectedItems = (isDeleting=false) => {
    const index = selectedItems.findIndex(item => {
      return item.data.id === selected.id;
    })
    
    if(index === -1){
      return
    }
    else if(isDeleting || selectedItems[index].count === 1){
      setSelectedItems(selectedItems.filter((item) =>
        item.data.id !== Number(selected.id)))
    }
    else{
      const newSelected = selectedItems.slice()
      newSelected[index].count = selectedItems[index].count-1
      setSelectedItems(newSelected)
    }
  }

  const setItem = (item) => {
    // console.log(item)
    setSelected(item)
  }

  if ( data === null || data === "")
    return (<div><p>No data returned from server :(</p></div>)
  else
  {
    return (
      <div className="App">
        <h1>NutriKit Food Planner</h1>
        <h3>NutriKit allows you to select your groceries, and track your nutritional progress (good or bad)</h3>
        <ItemDetails
          modal={detailsModal} toggle={toggleDetails} itemId={selected.id} updateItem={updateItemFromMenu}
          sections={sections} deleteItem={removeItemFromMenu} data={data}
        />
        <AddItem
          modal={addModal} toggle={toggleAdd} addItem={addItemToMenu}
          sections={sections} categories={categories}
        />
        <div className='container'>
            <div className='listbox'>
              <Row>
                <Button color={addModal ? 'secondary' : 'success'} onClick={toggleAdd}>Add Item</Button>                
              </Row>
            </div>
            <div className='listbox'>
              <Categories data={data} categories={categories} setCategory={setCategory}/>
            </div>
            <div className='listbox'>
              <Menu setIsRemoving={setIsRemoving} isRemoving={isRemoving}
                setItem={setItem} getInfo={getItemInfo}
                toggle={toggleDetails} data={data} category={category}
              />
              <div className='btn'>
                <Button onClick={() => selected.id !== 'test' ? addToSelectedItems() : null}>{'>>'}</Button>
              </div>
              {selected.id !== 'test' && 
                <div className='btn'>
                  <Button color={detailsModal ? 'secondary' : 'primary'} onClick={toggleDetails}>View{selected.id !== 'test' ? ' '+selected.name : ''}</Button>
                </div>
              }
            </div>
            <div className='listbox'>
              <SelectedItems selectedItems={selectedItems} setIsRemoving={setIsRemoving} 
                isRemoving={isRemoving} setItem={setItem} getInfo={getItemInfo}
                toggle={toggleDetails}
              />
            <div className='btn'>
              <Button onClick={() => selected.id !== 'test' ? removeFromSelectedItems() : null}>{'<<'}</Button>
            </div>
          </div>
          <div className='listbox'>
              <NutritionLabel categories={categories} items={selectedItems} sections={sections}/>
          </div>
          <div className='listbox'>
              <ProgressBar items={selectedItems} section={["calories", "Calorie"]} sectionGoal={2000} color={'primary'}></ProgressBar>
              <ProgressBar items={selectedItems} section={["totalFat", "Total Fat"]} sectionGoal={100} color={'secondary'}></ProgressBar>
              <ProgressBar items={selectedItems} section={["saturatedFat", "Saturated Fat"]} sectionGoal={200} color={'success'}></ProgressBar>
              <ProgressBar items={selectedItems} section={["transFat", "Trans Fat"]} sectionGoal={200} color={'danger'}></ProgressBar>
              <ProgressBar items={selectedItems} section={["protein", "Protein"]} sectionGoal={500} color={'warning'}></ProgressBar>
              <ProgressBar items={selectedItems} section={["carbohydrate", "Carbohydrate"]} sectionGoal={500} color={'info'}></ProgressBar>
          </div>
        </div>
      </div>
    );
  }
}

export default App;