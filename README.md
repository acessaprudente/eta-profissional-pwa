eta-profissional-pwa/
│
├── index.html              # Dashboard principal (equivalente ao main.py)
├── manifest.json           # Configuração PWA
├── service-worker.js       # Cache offline
├── icon.png                # Ícone único
│
├── css/
│   └── style.css           # Estilos visuais
│
└── js/
    ├── balanco.js          # Balanço de Massa
    ├── pac.js              # PAC Férrico (fiel ao calculo_pac.py)
    ├── cal.js              # Cal Hidratada (fiel ao cal.py)
    ├── polimero.js         # Polímero (fiel ao poli.py)
    ├── sedimentacao.js     # Sedimentação (fiel ao sedimentacao.py)
    ├── jar.js              # Jar Test com abas (PAC, Cal, Polímero, Comparativo)
    ├── export.js           # Exportação PDF/Excel
    └── storage.js          # Salvamento local (localStorage)
