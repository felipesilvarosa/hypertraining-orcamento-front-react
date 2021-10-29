import React from "react";
import axios from "axios";
import "./App.css";
import { AiFillDelete } from "react-icons/ai";

function App() {
	const [orcamentos, setOrcamentos] = React.useState([]);
	const [clickBtnOrcamento, setClickBtnOrcamento] = React.useState(false);
	const [descricao, setDescricao] = React.useState("");
	const [mes, setMes] = React.useState("");
	const [ano, setAno] = React.useState("");
	const [valorTotalInformado, setValorTotalInformado] = React.useState("");

	React.useEffect(carregarDados, []);

	function carregarDados() {
		async function fetchData() {
			let dados = await axios
				.get("http://localhost:8080/orcamentos")
				.then((response) => response.data);
			setOrcamentos(dados);
		}
		fetchData();
	}

	function handleDeleteClick(idOrcamento) {
		axios.delete(`http://localhost:8080/orcamentos/${idOrcamento}`).then(() => {
			carregarDados();
		});
	}

	function handleSaveClick() {
		let dados = {
			orcamento: { descricao, mes, ano, valorTotalInformado },
			itens: [],
		};

		axios.post(`http://localhost:8080/orcamentos`, dados).then(() => {
			carregarDados();
			setDescricao("");
			setMes("");
			setAno("");
			setValorTotalInformado("");
			setClickBtnOrcamento(false);
		});
	}

	return (
		<>
			<table className="table table-dark table-hover table-striped">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Descrição</th>
						<th scope="col">Periodo</th>
						<th scope="col">Valor Total Informado</th>
						<th scope="col">Valor Total Calculado</th>
						<th scope="col">Diferença de preço</th>
						<th scope="col">Ações</th>
					</tr>
				</thead>
				<tbody>
					{orcamentos.map((orcamento) => (
						<tr key={orcamento.id}>
							<td>{orcamento.id}</td>
							<td>{orcamento.descricao}</td>
							<td>
								{orcamento.mes}/{orcamento.ano}
							</td>
							<td>R${orcamento.valorTotalInformado}</td>
							<td>R${orcamento.valorTotalCalculado}</td>
							<td>
								R$
								{orcamento.valorTotalCalculado - orcamento.valorTotalInformado}
							</td>
							<td>
								<AiFillDelete
									onClick={() => handleDeleteClick(orcamento.id)}
									style={{ cursor: "pointer" }}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<button
				type="button"
				className="btn btn-outline-dark"
				onClick={() => setClickBtnOrcamento(!clickBtnOrcamento)}
			>
				{clickBtnOrcamento ? "Cancelar" : "Novo Orçamento"}
			</button>

			{clickBtnOrcamento && (
				<div>
					<div className="input-group mt-2 mb-2">
						<input
							type="text"
							classnName="form-control"
							placeholder="Descrição"
							aria-label="Descrição"
							value={descricao}
							onChange={(event) => setDescricao(event.target.value)}
						/>
					</div>
					<div className="input-group mt-2 mb-2">
						<input
							type="text"
							classnName="form-control"
							placeholder="Mês"
							aria-label="Mês"
							value={mes}
							onChange={(event) => setMes(event.target.value)}
						/>
					</div>
					<div className="input-group mt-2 mb-2">
						<input
							type="text"
							classnName="form-control"
							placeholder="Ano"
							aria-label="Ano"
							value={ano}
							onChange={(event) => setAno(event.target.value)}
						/>
					</div>
					<div className="input-group mt-2 mb-2">
						<input
							type="text"
							classnName="form-control"
							placeholder="Valor total"
							aria-label="Valor total"
							value={valorTotalInformado}
							onChange={(event) => setValorTotalInformado(event.target.value)}
						/>
					</div>
					<button
						type="button"
						className="btn btn-outline-dark"
						onClick={handleSaveClick}
					>
						Salvar
					</button>
				</div>
			)}
		</>
	);
}

export default App;
