import React from "react";
import Pagina from "../../components/Pagina";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import apiDeputados from "../../services/apiDeputados";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { format } from 'date-fns';




const detalhesDeputado = ({ deputado, despesas, profissoes, groupedDespesas, sortedData }) => {
  return (
    <Pagina titulo="Detalhes">
      <Row className="mb-3">
        <Col md={3}>
          <Card className="mb-3">
            <Card.Img variant="top" src={deputado.ultimoStatus.urlFoto} />
            <Card.Body>
              <Card.Title>{deputado.ultimoStatus.nome}</Card.Title>
              <p>Partido: {deputado.ultimoStatus.siglaPartido}</p>
              <p>UF Partido: {deputado.ultimoStatus.siglaUf}</p>
            </Card.Body>
          </Card>
          <Button href="/deputados" variant="danger">
            Voltar
          </Button>
        </Col>
        <Col md={7}>
          <h3>Despesas</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Data</th>
                <th>Descrição</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {despesas.map((item) => (
                <tr>
                  <td>{item.dataDocumento}</td>
                  <td>{item.tipoDespesa}</td>
                  <td>{item.valorLiquido}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        
      </Row>
      <Row>
      <Col>
        <LineChart width={800} height={400} data={sortedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="mes" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="valor" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
        </Col>
      </Row>
    </Pagina>
  );
};

export default detalhesDeputado;

export async function getServerSideProps(context) {
  const id = context.params.id;

  const resultado = await apiDeputados.get("/deputados/" + id);
  const deputado = resultado.data.dados;

  const resDespesas = await apiDeputados.get("/deputados/" + id + "/despesas?ordem=DESC&ordenarPor=mes&itens=100");
  const despesas = resDespesas.data.dados;

  const resProfissoes = await apiDeputados.get(
    "/deputados/" + id + "/profissoes"
  );
  const profissoes = resProfissoes.data.dados;

  const groupedDespesas = despesas.reduce((acc, despesa) => {
    const mes = format(new Date(despesa.dataDocumento), 'MMMM yyyy');
    if (acc[mes]) {
      acc[mes] += despesa.valorDocumento;
    } else {
      acc[mes] = despesa.valorDocumento;
    }
    return acc;
  }, {});
  const sortedData = Object.entries(groupedDespesas)
  .map(([mes, valor]) => ({
    mes,
    valor,
  }))
  .sort((a, b) => {
    const dateA = new Date(a.mes);
    const dateB = new Date(b.mes);
    return dateA - dateB;
  });


  return {
    props: { deputado, despesas, profissoes, groupedDespesas, sortedData },
  };
}
