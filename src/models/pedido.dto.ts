import { RefDTO } from "./ref.dot";
import { PagamentoDTO } from "./pagamento.dto";
import { ItemPedidiDTO } from "./item-pedido.dto";

export interface PedidoDTO {
  cliente: RefDTO;
  enderecoDeEntrega: RefDTO;
  pagamento: PagamentoDTO;
  items: ItemPedidiDTO[];
}
