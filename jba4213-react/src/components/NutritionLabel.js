import { Form, Row, Col } from 'reactstrap';
import './Label.css';

const NutritionLabel = ({ items, sections }) => {
    
    const getTotal = (section) => {
        let sum = 0;
        items.forEach(item => {
          sum += (
            item.data[section] * item.count
          )
        })
        return Number(sum.toFixed(2))
    }

    const getRows = () => {
        const high = 'high border text-center'
        const medium = 'bg-light border text-center'
        const low = 'low border text-center'
        let style = medium
        return (
            Object.entries(sections).map(section => {
                let total = getTotal(section[0])
                if(total > 2000)
                    style = high
                if(total < 5)
                    style = low

                if (!isNaN(total) && section[0] !== 'name' && section[0] !== 'category') {
                    let total = getTotal(section[0])
                    return(
                    <Row key={section[0]}>
                        <Col key={section[0]} value={section[0]} className={medium}>
                            {section[1]}
                        </Col>
                        <Col key={[section[0], total]} value={total} 
                            className={style}
                        >    
                            {total}
                        </Col>
                    </Row>
                    );
                }
                return null
            })
        );
    }

    return (  
        <Form>
            <Row><Col className="bg-light border text-center">Total Nutrition Facts</Col></Row>
            {getRows()}
        </Form>
    );
}

export default NutritionLabel