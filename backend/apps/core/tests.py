from django.test import TestCase
from django.urls import reverse

class HomeViewTests(TestCase):
    def test_home_view_returns_inertia_component(self):
        response = self.client.get(reverse('home'))
        self.assertEqual(response.status_code, 200)
        self.assertIn('X-Inertia', response.headers)
        self.assertEqual(response.headers['X-Inertia'], 'true')
        # Inertia response content is JSON
        self.assertEqual(response.json()['component'], 'Home')
