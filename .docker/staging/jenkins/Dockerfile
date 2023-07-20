# Use a imagem oficial do Jenkins como base
FROM jenkins/jenkins:lts

# Informações sobre o mantenedor
LABEL maintainer="seu_nome <seu_email>"

# Altere para o usuário root para instalar dependências
USER root

# Instalação do Docker
RUN apt-get update && \
    apt-get -y install apt-transport-https ca-certificates curl gnupg2 software-properties-common && \
    curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add - && \
    add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable" && \
    apt-get update && \
    apt-get -y install docker-ce

# Instalação do Docker Compose
RUN curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && \
    chmod +x /usr/local/bin/docker-compose

# Instalação do Makefile (Se não estiver presente por padrão)
RUN apt-get -y install make

# Volta ao usuário jenkins
USER jenkins

# Instalação de plugins do Jenkins
RUN /usr/local/bin/install-plugins.sh \
    docker-plugin \
    docker-workflow \
    docker-compose-build-step \
    makefile-executor \
    git \
    github \
    workflow-aggregator \
    credentials \
    warnings-ng \
    email-ext \
    # Adicione mais plugins aqui conforme necessário

# Define algumas variáveis de ambiente do Jenkins (opcional)
# ENV JAVA_OPTS="-Xmx512m"

# Para evitar a execução do assistente de instalação na primeira execução
# ENV JAVA_OPTS="-Djenkins.install.runSetupWizard=false"

# EXEMPLO: Copiar arquivos de configuração para o Jenkins Home
# COPY config.xml /var/jenkins_home/

# O Jenkins estará acessível na porta 8080 (pode ser mapeada para uma porta diferente ao iniciar o contêiner)

# Outras configurações e personalizações podem ser adicionadas conforme necessário.
