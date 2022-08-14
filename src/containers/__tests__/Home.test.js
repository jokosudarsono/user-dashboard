import { render, waitFor, screen, act } from "@testing-library/react";
import { Provider } from 'react-redux';
import userEvent from "@testing-library/user-event";
import axios from "axios";
import store from 'store';
import Home from '../Home'

jest.mock("axios")

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
    t: (str) => str,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
    };
  },
}));

const dummy = [
  {
    gender: "male",
    name: {
      title: "Mr",
      first: "Roman",
      last: "Zhang"
    },
    email: "roman.zhang@example.com",
    login: {
      username: "beautifulpanda746"
    },
    registered: {
      date: "2006-02-03T11:33:28.752Z"
    }
  },
  {
    gender: "female",
    name: {
      title: "Miss",
      first: "Fátima",
      last: "Nunes"
    },
    email: "roman.zhang@example.com",
    login: {
      username: "beautifulpanda74624234"
    },
    registered: {
      date: "2006-02-03T11:33:28.752Z"
    }
  },
  {
    gender: "male",
    name: {
      title: "Mr",
      first: "Deniz",
      last: "Aydan"
    },
    email: "roman.zhang@example.com",
    login: {
      username: "beautifulpanda746cxvsdf"
    },
    registered: {
      date: "2006-02-03T11:33:28.752Z"
    }
  },
  {
    gender: "female",
    name: {
      title: "Miss",
      first: "Solomoniya",
      last: "Shulika"
    },
    email: "roman.zhang@example.com",
    login: {
      username: "beautifulpanda746"
    },
    registered: {
      date: "2006-02-03T11:33:28.752Z"
    }
  },
]

test('test first render users', async () => {
  axios.get.mockResolvedValueOnce({ data: { results: dummy } })

  act(() => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
  });

  await waitFor(() => {
    expect(screen.getAllByRole("row")).toHaveLength(5) // includes table header
  })
});

test('test filter input keyword users', async () => {
  act(() => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
  });

  userEvent.type(await screen.getByTestId('input-search'), 'Roman')
  expect(await screen.getByTestId('input-search')).toHaveValue('Roman')
  expect(axios.get).toHaveBeenCalled()
  expect(axios.get).toHaveBeenCalledTimes(1)
});

test('test filter input gender users', async () => {
  act(() => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
  });

  userEvent.selectOptions(await screen.getByTestId('input-gender'), 'male');
  expect(await screen.getByTestId('input-gender')).toHaveValue('male')
  expect(axios.get).toHaveBeenCalled()
  expect(axios.get).toHaveBeenCalledTimes(1)
})

test('test page changes', async () => {
  act(() => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
  });

  await waitFor(() => {
    userEvent.click(screen.getByTestId('next-page'))
    expect(axios.get).toHaveBeenCalled()
    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(screen.getByTestId('current-page')).toHaveTextContent('2')
  })

  await waitFor(() => {
    userEvent.click(screen.getByTestId('prev-page'))
    expect(axios.get).toHaveBeenCalled()
    expect(axios.get).toHaveBeenCalledTimes(2)
    expect(screen.getByTestId('current-page')).toHaveTextContent('1')
  })
});
