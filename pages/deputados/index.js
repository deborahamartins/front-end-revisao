import React from 'react'
import apiDeputados from '../../services/apiDeputados'
import Pagina from '../../components/Pagina'
import { Card, Col, Row } from 'react-bootstrap'
import Link from 'next/link'

const index = ({deputados}) => {
  return (
    <Pagina titulo='Deputados'>
        <Row md={6} className="mb-3">
        {deputados.map(item => (
           <Col key={item.id}>
            <Card className='mb-3'>
              <Link href={'/deputados/' + item.id}>
                <Card.Img variant='top'src={item.urlFoto} />  
              </Link>
          </Card>
          </Col>
          ))}
      </Row>
    </Pagina>
  )
}

export default index

export async function getServerSideProps(context) {

  const resultado = await apiDeputados.get('/deputados')
  const deputados = resultado.data.dados
  return {
    props: {deputados}, // will be passed to the page component as props
  }
}