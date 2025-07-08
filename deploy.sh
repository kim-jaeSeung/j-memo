#!/bin/bash

# 배포 스크립트 - 서버에서 실행
set -e

echo "Starting deployment..."

# 최신 이미지 pull
docker pull ghcr.io/kim-jaeSeung/j-memo:latest

# 기존 컨테이너 중지 및 제거
docker stop jmemo || true
docker rm jmemo || true

# 새 컨테이너 실행
docker run -d \
  --name jmemo \
  -p 3000:3000 \
  --restart unless-stopped \
  ghcr.io/kim-jaeSeung/j-memo:latest

echo "Deployment completed!"

# 헬스 체크
sleep 5
if curl -f http://localhost:3000/api/health 2>/dev/null; then
  echo "Application is healthy!"
else
  echo "Application might not be ready yet"
fi
