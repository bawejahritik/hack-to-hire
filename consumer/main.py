# import ssl
# import pika
# import json
# import smtplib
# from email.message import EmailMessage
# from dotenv import load_dotenv
# import os

# load_dotenv()

# def send_email(to, subject, body):
#     email_sender = 'hritikbaweja2@gmail.com'
#     email_password = os.getenv("email_password")
#     em = EmailMessage()
#     em['Subject'] = subject
#     em['From'] = email_sender
#     em['To'] = to
#     em.set_content(body)
    
#     context = ssl.create_default_context()

#     with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
#         smtp.login(email_sender, email_password)
#         smtp.sendmail(email_sender, to, em.as_string())

# def callback(ch, method, properties, body):
#     email_details = json.loads(body)
#     print(f" [x] Received email details: {email_details}")
#     try:
#         send_email(email_details['to'], email_details['subject'], email_details['body'])
#         print(" [x] Email sent successfully!")
#     except Exception as e:
#         print(f" [x] Failed to send email: {str(e)}")
#     ch.basic_ack(delivery_tag=method.delivery_tag)

# def main():
#     connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
#     channel = connection.channel()
#     channel.queue_declare(queue='email_queue')
#     channel.basic_consume(queue='email_queue', on_message_callback=callback)
#     print(' [*] Waiting for messages. To exit press CTRL+C')
#     channel.start_consuming()

# if __name__ == "__main__":
#     main()

#!/usr/bin/env python
import pika

connection = pika.BlockingConnection(
    pika.ConnectionParameters(host='localhost'))
channel = connection.channel()

channel.queue_declare(queue='hello')

channel.basic_publish(exchange='', routing_key='hello', body='Hello World!')
print(" [x] Sent 'Hello World!'")
connection.close()
