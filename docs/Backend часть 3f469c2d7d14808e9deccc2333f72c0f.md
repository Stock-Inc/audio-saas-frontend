# Backend часть

Основной Backend — центральный сервис системы. Через него работают Web и Mobile приложения, а ML-сервис является отдельным внутренним сервисом, который Backend использует для обработки аудио.

Backend отвечает за пользователей, авторизацию, права доступа, загрузку и хранение файлов, историю записей, папки и теги, создание задач обработки, хранение транскрипций и результатов анализа, экспорт, уведомления и историю AI-чата.

Типовой сценарий выглядит так:

**Web / Mobile → Backend → File Storage → ML Service → Backend → Web / Mobile**

Пользователь загружает аудио. Backend сохраняет файл, создаёт запись и ML-задачу, передаёт файл ML-сервису, отслеживает статус обработки и после завершения получает транскрипцию, summary, темы, решения и задачи. Результат сохраняется в основной БД и становится доступен пользователю с любого устройства.

Важно, чтобы основной Backend не зависел от конкретных ML-моделей. Он должен знать только контракт ML-сервиса: создать задачу, получить статус, получить результат.

---

# TODO

## База проекта

- [ ]  Создать Spring Boot приложение
- [ ]  Настроить структуру проекта
- [ ]  Настроить PostgreSQL
- [ ]  Настроить миграции БД
- [ ]  Настроить dev/test/prod конфигурации
- [ ]  Настроить Docker
- [ ]  Настроить логирование
- [ ]  Настроить Swagger / OpenAPI
- [ ]  Добавить healthcheck
- [ ]  Добавить correlation ID

## Авторизация

- [ ]  Регистрация пользователя
- [ ]  Авторизация
- [ ]  JWT access token
- [ ]  Refresh token
- [ ]  Logout
- [ ]  Обновление токенов
- [ ]  Получение профиля
- [ ]  Редактирование профиля
- [ ]  Восстановление пароля
- [ ]  Разграничение доступа к данным

## Файлы

- [ ]  API загрузки аудио
- [ ]  Проверка формата
- [ ]  Проверка размера
- [ ]  Получение metadata файла
- [ ]  Настроить файловое хранилище
- [ ]  Получение файла
- [ ]  Удаление файла
- [ ]  Генерация временных URL для ML
- [ ]  Контроль доступа к файлам

## Записи

- [ ]  Создание записи
- [ ]  Получение записи
- [ ]  Редактирование названия
- [ ]  Удаление записи
- [ ]  История записей
- [ ]  Pagination
- [ ]  Сортировка
- [ ]  Фильтрация
- [ ]  Поиск

## Папки и теги

- [ ]  Создание папки
- [ ]  Переименование папки
- [ ]  Удаление папки
- [ ]  Перемещение записи в папку
- [ ]  Создание тегов
- [ ]  Добавление тегов к записи
- [ ]  Удаление тегов
- [ ]  Поиск по папкам и тегам

## ML-интеграция

- [ ]  REST-клиент для ML Service
- [ ]  Создание ML-job
- [ ]  Передача файла на обработку
- [ ]  Передача параметров обработки
- [ ]  Хранение mlJobId
- [ ]  Получение статуса обработки
- [ ]  Получение прогресса
- [ ]  Callback от ML Service
- [ ]  Получение результата
- [ ]  Сохранение транскрипции
- [ ]  Сохранение таймкодов
- [ ]  Сохранение спикеров
- [ ]  Сохранение summary
- [ ]  Сохранение тем
- [ ]  Сохранение тезисов
- [ ]  Сохранение решений
- [ ]  Сохранение задач
- [ ]  Retry ML-job
- [ ]  Cancel ML-job
- [ ]  Обработка ошибок ML
- [ ]  Timeout
- [ ]  Idempotency

## Статусы обработки

- [ ]  UPLOADED
- [ ]  QUEUED
- [ ]  PROCESSING
- [ ]  TRANSCRIBING
- [ ]  ANALYZING
- [ ]  COMPLETED
- [ ]  FAILED
- [ ]  CANCELLED

## Результаты

- [ ]  API получения транскрипции
- [ ]  API получения исправленной транскрипции
- [ ]  API получения summary
- [ ]  API получения тем
- [ ]  API получения решений
- [ ]  API получения задач
- [ ]  API получения спикеров
- [ ]  API редактирования транскрипции
- [ ]  API изменения имени спикера

## Экспорт

- [ ]  Экспорт TXT
- [ ]  Экспорт Markdown
- [ ]  Экспорт JSON
- [ ]  Экспорт DOCX/PDF при необходимости
- [ ]  Экспорт полной транскрипции
- [ ]  Экспорт summary
- [ ]  Экспорт протокола встречи

## AI-чат

- [ ]  Создание чата по записи
- [ ]  Отправка вопроса в ML Service
- [ ]  Передача recordId
- [ ]  Получение ответа
- [ ]  Сохранение истории сообщений
- [ ]  Получение истории чата
- [ ]  Удаление чата
- [ ]  Хранение ссылок на таймкоды ответа

## Уведомления

- [ ]  Уведомление о завершении обработки
- [ ]  Уведомление об ошибке
- [ ]  Интеграция с мобильными push
- [ ]  WebSocket/SSE для Web
- [ ]  Обновление статусов в реальном времени

## Надёжность

- [ ]  Global exception handler
- [ ]  Retry внешних сервисов
- [ ]  Timeout
- [ ]  Rate limiting
- [ ]  Idempotency-Key
- [ ]  Защита от двойного создания ML-job
- [ ]  Проверка прав доступа
- [ ]  Audit logging

## Тестирование

- [ ]  Unit tests
- [ ]  Repository tests
- [ ]  API tests
- [ ]  Integration tests PostgreSQL
- [ ]  Integration tests File Storage
- [ ]  Mock ML Service
- [ ]  Тест авторизации
- [ ]  Тест прав доступа
- [ ]  Тест полного flow загрузки
- [ ]  Тест callback ML
- [ ]  Тест ошибок ML

## Production

- [ ]  Docker image
- [ ]  CI/CD
- [ ]  Metrics
- [ ]  Prometheus
- [ ]  Monitoring
- [ ]  Centralized logs
- [ ]  Backup БД
- [ ]  Secrets management
- [ ]  Production configuration

---

# Основные сущности Backend

```
User
RefreshToken

Record
AudioFile

Folder
Tag
RecordTag

ProcessingJob

Transcript
TranscriptSegment
Speaker

Analysis
Topic
Decision
ActionItem

Chat
ChatMessage
```

---

# Контракт Web / Mobile → Backend

Все клиентские приложения работают только с основным Backend.

## Авторизация

```
POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/refresh
POST /api/v1/auth/logout

GET /api/v1/users/me
PATCH /api/v1/users/me
```

---

## Загрузка файла

```
POST /api/v1/records
```

Multipart:

```
file: meeting.mp3
name: Планёрка
folderId: optional
```

Response:

```
{
  "id": "record-123",
  "name": "Планёрка",
  "status": "UPLOADED"
}
```

---

## Запуск обработки

```
POST /api/v1/records/{recordId}/process
```

Request:

```
{
  "language": "auto",
  "diarization": true,
  "summary": true
}
```

Response:

```
{
  "recordId": "record-123",
  "status": "QUEUED"
}
```

---

## Статус

```
GET /api/v1/records/{recordId}/status
```

```
{
  "status": "PROCESSING",
  "progress": 54,
  "stage": "TRANSCRIBING"
}
```

---

## История

```
GET /api/v1/records
```

Параметры:

```
page
size
search
folderId
tag
status
sort
```

---

## Получение записи

```
GET /api/v1/records/{recordId}
```

---

## Получение результата

```
GET /api/v1/records/{recordId}/result
```

Response:

```
{
  "id": "record-123",

  "transcript": {
    "rawText": "...",
    "correctedText": "...",
    "segments": [
      {
        "speaker": "SPEAKER_01",
        "start": 12.2,
        "end": 18.5,
        "text": "..."
      }
    ]
  },

  "analysis": {
    "summary": "...",
    "topics": [],
    "keyPoints": [],
    "decisions": [],
    "tasks": []
  }
}
```

---

# Папки

```
GET    /api/v1/folders
POST   /api/v1/folders
PATCH  /api/v1/folders/{id}
DELETE /api/v1/folders/{id}
```

Перемещение записи:

```
PATCH /api/v1/records/{recordId}/folder
```

---

# Теги

```
GET    /api/v1/tags
POST   /api/v1/tags
DELETE /api/v1/tags/{id}
```

---

# Экспорт

```
GET /api/v1/records/{recordId}/export?format=pdf
```

Возможные форматы:

```
txt
md
json
docx
pdf
```

---

# AI-чат

```
POST /api/v1/records/{recordId}/chat/messages
```

Request:

```
{
  "message": "Что решили по срокам релиза?"
}
```

Response:

```
{
  "messageId": "msg-123",
  "answer": "Было принято решение перенести релиз...",
  "sources": [
    {
      "start": 540.2,
      "end": 575.8
    }
  ]
}
```

История:

```
GET /api/v1/records/{recordId}/chat/messages
```

---

# Контракт Main Backend → ML Backend

## Создание ML-job

```
POST /api/v1/ml/jobs
```

```
{
  "requestId": "request-123",
  "recordId": "record-123",

  "file": {
    "url": "https://storage/.../meeting.mp3",
    "contentType": "audio/mpeg"
  },

  "options": {
    "language": "auto",
    "diarization": true,
    "timestamps": true,
    "correction": true,
    "summary": true,
    "topics": true,
    "decisions": true,
    "tasks": true,
    "preset": "AUTO"
  },

  "callbackUrl": "https://backend/api/v1/internal/ml/callback"
}
```

Response:

```
{
  "jobId": "ml-job-456",
  "status": "QUEUED"
}
```

---

## Получение статуса ML-job

```
GET /api/v1/ml/jobs/{jobId}
```

```
{
  "jobId": "ml-job-456",
  "status": "TRANSCRIBING",
  "progress": 47
}
```

---

## Callback

```
POST /api/v1/internal/ml/callback
```

```
{
  "jobId": "ml-job-456",
  "recordId": "record-123",
  "status": "COMPLETED"
}
```

Backend после этого запрашивает результат.

---

## Получение результата ML

```
GET /api/v1/ml/jobs/{jobId}/result
```

ML возвращает:

```
{
  "transcript": {
    "rawText": "...",
    "correctedText": "...",
    "segments": []
  },

  "analysis": {
    "summary": "...",
    "topics": [],
    "keyPoints": [],
    "decisions": [],
    "tasks": []
  },

  "meta": {
    "language": "ru",
    "duration": 3600,
    "preset": "MEDIUM"
  }
}
```

Backend сохраняет этот результат в своей БД.

---

# Чат Backend → ML

```
POST /api/v1/ml/chat
```

```
{
  "recordId": "record-123",
  "question": "Что решили по поводу релиза?"
}
```

Response:

```
{
  "answer": "Релиз решили перенести на следующую неделю.",
  "sources": [
    {
      "start": 602.5,
      "end": 630.1
    }
  ]
}
```

Backend сохраняет вопрос и ответ в `ChatMessage`.

---

# Общий flow

```
Пользователь
    ↓
Web / Mobile
    ↓
Main Backend
    ↓
авторизация
    ↓
загрузка файла
    ↓
File Storage
    ↓
создание Record
    ↓
создание ProcessingJob
    ↓
ML Service
    ↓
обработка аудио
    ↓
callback
    ↓
Main Backend
    ↓
получение результата
    ↓
сохранение в PostgreSQL
    ↓
Web / Mobile
```