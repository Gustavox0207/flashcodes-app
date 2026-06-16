import { useState, useEffect } from 'react';

// Exportamos a URL da capa para poder usar na tela
export const DECK_COVER_URL = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';

export const initialData = [
  {
    id: '1', title: 'Hook de Estado', subtitle: 'useState',
    image: 'https://cdn.iconscout.com/icon/free/png-256/free-react-1-282599.png',
    code: 'const [count, setCount] = useState(0);',
    description: 'O hook useState é uma função fundamental no React e React Native que permite adicionar e gerenciar o estado local em componentes funcionais. Ele retorna um array com duas posições: o valor atual do estado e uma função dedicada para atualizá-lo, garantindo a re-renderização da interface sempre que houver mudanças. Essa ferramenta substituiu a necessidade de classes para gerenciar variáveis dinâmicas.'
  },
  {
    id: '2', title: 'Efeitos Colaterais', subtitle: 'useEffect',
    image: 'https://cdn.iconscout.com/icon/free/png-256/free-react-1-282599.png',
    code: 'useEffect(() => {\n  fetchData();\n}, []);',
    description: 'O hook useEffect é utilizado para lidar com efeitos colaterais em componentes funcionais, como chamadas de APIs externas, subscrições de banco de dados ou manipulação manual do DOM. Ele é executado logo após a renderização do componente e pode ser configurado com um array de dependências para controlar com precisão matemática exatamente quando o efeito deve ser disparado novamente pelo ciclo de vida.'
  },
  {
    id: '3', title: 'Listas Otimizadas', subtitle: 'FlatList',
    image: 'https://cdn.iconscout.com/icon/free/png-256/free-react-1-282599.png',
    code: '<FlatList data={data} renderItem={renderItem} />',
    description: 'A FlatList é um componente essencial e altamente otimizado para renderizar listas extensas de dados no React Native. Diferente de um ScrollView comum, ela consome memória de forma inteligente, renderizando ativamente apenas os itens que estão visíveis na tela do usuário no momento, o que garante excelente performance em dispositivos móveis mesmo com milhares de registros complexos.'
  },
  {
    id: '4', title: 'Estilização Padrão', subtitle: 'StyleSheet',
    image: 'https://cdn.iconscout.com/icon/free/png-256/free-react-1-282599.png',
    code: 'const styles = StyleSheet.create({ container: {} });',
    description: 'A API StyleSheet do React Native é a maneira padrão e mais eficiente de criar estilos e aplicar um design visualmente consistente aos componentes. Semelhante ao CSS tradicional do desenvolvimento web, ela permite definir regras de estilização em objetos JavaScript puros, proporcionando validação de propriedades em tempo de compilação e melhorando significativamente a legibilidade e a manutenção do código fonte.'
  },
  {
    id: '5', title: 'Armazenamento Local', subtitle: 'AsyncStorage',
    image: 'https://cdn.iconscout.com/icon/free/png-256/free-react-1-282599.png',
    code: 'await AsyncStorage.setItem("@key", value);',
    description: 'O AsyncStorage é um sistema de armazenamento de dados chave-valor, não criptografado e estritamente assíncrono, ideal para persistir informações simples localmente no dispositivo. É frequentemente utilizado em aplicativos móveis para salvar preferências de tema do usuário, tokens de autenticação JWT ou pequenos volumes de dados necessários para o funcionamento offline e para o sistema de repetição espaçada do seu app.'
  }
];

export default function useFlashcards(initialCards) {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCards(initialCards);
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [initialCards]);

  const addCard = (newCard) => {
    setCards((prevCards) => [...prevCards, newCard]);
  };

  return { cards, isLoading, addCard };
}