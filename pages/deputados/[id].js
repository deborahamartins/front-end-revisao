import React from "react";
import Pagina from "../../components/Pagina";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import apiDeputados from "../../services/apiDeputados";

const detalhesDeputado = ({ deputado, despesas, profissoes }) => {
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
        <Col md={2}>
          <h3>Profissões</h3>
          <ul>
            {profissoes.map((item) => (
              <li>{item.titulo}</li>
            ))}
          </ul>
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

  const resDespesas = await apiDeputados.get("/deputados/" + id + "/despesas");
  const despesas = resDespesas.data.dados;

  const resProfissoes = await apiDeputados.get(
    "/deputados/" + id + "/profissoes"
  );
  const profissoes = resProfissoes.data.dados;

  return {
    props: { deputado, despesas, profissoes },
  };
}
