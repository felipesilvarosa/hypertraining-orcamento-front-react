import React from "react";
import "./App.css";
import Orcamentos from "./components/Orcamentos";
import DetalharOrcamento from "./components/DetalharOrcamento";

function App() {
	const [orcamentoDetalhado, setOrcamentoDetalhado] = React.useState(null);

	return (
		<>
			{orcamentoDetalhado === null ? (
				<Orcamentos setOrcamentoDetalhado={setOrcamentoDetalhado} />
			) : (
				<DetalharOrcamento
					setOrcamentoDetalhado={setOrcamentoDetalhado}
					orcamento={orcamentoDetalhado}
				/>
			)}
		</>
	);
}

export default App;
