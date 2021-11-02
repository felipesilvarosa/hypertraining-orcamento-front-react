import { IoMdArrowRoundBack } from "react-icons/io";
import axios from "axios";
import React from "react";

function DetalharOrcamento(props) {
	const [itensOrcamentos, setItensOrcamento] = React.useState([]);

	React.useEffect(loadData, []);

	function loadData() {
		async function fetchData() {
			let dados = await axios
				.get(`/orcamentos/${props.orcamento.id}/itens-orcamento`)
				.then((response) => response.data);
			setItensOrcamento(dados);
		}
		fetchData();
	}

	return (
		<>
			<h3>
				<IoMdArrowRoundBack
					className="pointer"
					onClick={() => props.setOrcamentoDetalhado(null)}
				/>
			</h3>

			<p>
				Descrição: {props.orcamento.descricao}
				Periodo: {props.orcamento.mes} / {props.orcamento.ano}
				Valor total informado: R$ {props.orcamento.valorTotal}
				Valor total calculado: R$ {props.orcamento.valorTotalCalculado}
				Diferença de Calculo: R$ {props.orcamento.diferencaCalculo}
			</p>

			<table className="table table-dark table-hover table-striped">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Origem</th>
						<th scope="col">Codigo</th>
						<th scope="col">Descrição</th>
						<th scope="col">Valor Unitario</th>
						<th scope="col">Unidade medida</th>
						<th scope="col">Quantidade</th>
						<th scope="col">Valor Total informado</th>
					</tr>
				</thead>
				<tbody>
					{itensOrcamentos.map((itemOrcamento, index) => (
						<tr key={itemOrcamento.id}>
							<td>{index + 1}</td>
							<td>{itemOrcamento.origem}</td>
							<td>{itemOrcamento.codigoItem}</td>
							<td>{itemOrcamento.descricaoItem}</td>
							<td>R$ {itemOrcamento.valorUnitario}</td>
							<td>{itemOrcamento.unidadeMedida}</td>
							<td>{itemOrcamento.quantidade}</td>
							<td>R$ {itemOrcamento.valorTotalInformado}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}

export default DetalharOrcamento;
