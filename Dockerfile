# Dockerfile
FROM eclipse-temurin:21-jdk-jammy

# 作業ディレクトリの作成
WORKDIR /app

# プロジェクト内のファイルをコピー
COPY . .

# Gradleを使用してアプリをビルド
RUN chmod +x gradlew && ./gradlew build -p app

# JARファイルを指定してアプリを実行
CMD ["java", "-jar", "app/build/libs/app-all.jar"]