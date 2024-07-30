from django.db.models.signals import post_migrate
from django.dispatch import receiver
from django.core.management import call_command
from django.apps import AppConfig

@receiver(post_migrate)
def load_initial_data(sender, **kwargs):
    if sender.name == 'product':
        call_command('loaddata', 'initial_data.json')