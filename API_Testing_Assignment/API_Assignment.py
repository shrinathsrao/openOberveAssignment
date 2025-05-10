import requests
import pytest
from requests.auth import HTTPBasicAuth

# Fixture to set up common test data
@pytest.fixture
def setup():
    url = "http://localhost:5080/api/default/_search"
    params = {
        "type": "logs",
        "search_type": "dashboards",
        "use_cache": "true",
        "dashboard_id": "7326927266900869152",
        "folder_id": "default"
    }
    username = "admin@example.com"
    password = "admin123"
    
    # Payload to be sent in the POST request
    payload = {
        "query": {
            "sql": "SELECT kubernetes_container_name as \"x_axis_1\", count(kubernetes_container_name) as \"y_axis_1\", kubernetes_container_name as \"breakdown_1\" FROM \"default\" GROUP BY x_axis_1, breakdown_1",
            "query_fn": None,
            "sql_mode": "full",
            "start_time": 1746796975340000,
            "end_time": 1746883375340000,
            "size": -1
        }
    }
    
    return url, params, payload, username, password

# Test function using pytest
def test_search_api(setup):
    url, params, payload, username, password = setup
    
    # Send POST request with basic authentication, parameters, and payload
    response = requests.post(url, params=params, json=payload, auth=HTTPBasicAuth(username, password))

    # Validate status code is 200
    assert response.status_code == 200, f"Expected 200, got {response.status_code}"

    # Validate the response is not empty
    assert len(response.text.strip()) > 0, "Response body is empty"

    # Success message
    print(f"\n\n\n**************************************************************************Status Code 200 received with the following non-empty response**************************************************\n\n\n - {response.text}")
