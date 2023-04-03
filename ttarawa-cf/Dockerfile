# 기반 이미지를 Python 3.8 버전을 사용하는 이미지로 설정합니다.
FROM python:3.8

RUN apt update && \
    apt install -y libmariadb-dev-compat libmariadb-dev && \
    apt clean && \
    rm -rf /var/lib/apt/lists/*

# 작업 디렉토리를 /app으로 설정합니다.
WORKDIR /app

# requirements.txt 파일을 작업 디렉토리로 복사합니다.
COPY requirements.txt .

# requirements.txt에 명시된 라이브러리들을 설치합니다.
RUN pip install --no-cache-dir -r requirements.txt

# 현재 디렉토리의 모든 파일을 컨테이너의 /app/ 디렉토리에 복사합니다.
COPY . /app

# gunicorn을 설치합니다.
RUN pip install gunicorn

# gunicorn으로 Flask 애플리케이션을 실행합니다.
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "app:app"]
