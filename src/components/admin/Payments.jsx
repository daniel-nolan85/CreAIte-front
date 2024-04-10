import moment from 'moment';

const Payments = ({ paymentData }) => {
  const paymentDataFor2024 = paymentData['2024'];
  const flatPaymentDataFor2024 = [];
  for (const month in paymentDataFor2024) {
    flatPaymentDataFor2024.push(...paymentDataFor2024[month]);
  }
  console.log({ flatPaymentDataFor2024 });
  return (
    <section className='w-full p-4 bg-white'>
      <div>
        <div className='overflow-auto rounded-lg shadow hidden md:block'>
          <table className='w-full'>
            <thead className='bg-gray-50 border-b-2 border-gray-200'>
              <tr>
                <th className='w-20 p-3 text-sm font-semibold tracking-wide text-left'>
                  No.
                </th>
                <th className='p-3 text-sm font-semibold tracking-wide text-left'>
                  Description
                </th>
                <th className='w-24 p-3 text-sm font-semibold tracking-wide text-left'>
                  Status
                </th>
                <th className='w-24 p-3 text-sm font-semibold tracking-wide text-left'>
                  Date
                </th>
                <th className='w-32 p-3 text-sm font-semibold tracking-wide text-left'>
                  Amount
                </th>
                <th className='w-32 p-3 text-sm font-semibold tracking-wide text-left'>
                  Fee
                </th>
                <th className='w-32 p-3 text-sm font-semibold tracking-wide text-left'>
                  Total
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-100'>
              {flatPaymentDataFor2024.map((payment, index, array) => (
                <tr
                  className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
                  key={payment.id}
                >
                  <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                    <span className='font-bold text-main'>
                      {array.length - index}
                    </span>
                  </td>
                  <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                    {payment.description}
                  </td>
                  <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                    <span
                      className={`p-1.5 text-xs font-medium uppercase tracking-wider rounded-lg bg-opacity-50 ${
                        payment.status === 'pending'
                          ? 'text-yellow-800 bg-yellow-200'
                          : payment.status === 'available'
                          ? 'text-green-800 bg-green-200'
                          : ''
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                    {moment(payment.created).format('ddd, MMMM Do YYYY')}
                  </td>
                  <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                    ${payment.amount}
                  </td>
                  <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                    ${payment.fee}
                  </td>
                  <td
                    className='p-3 text-lg font-bold whitespace-nowrap'
                    style={{ color: payment.net >= 0 ? '#00df9a' : '#ff6666' }}
                  >
                    ${payment.net}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden'>
          {flatPaymentDataFor2024.map((payment, index, array) => (
            <div className='bg-white space-y-3 p-4 rounded-lg shadow'>
              <div className='flex justify-between items-center space-x-2 text-sm'>
                <div>
                  <span className='font-bold text-main'>
                    {array.length - index}
                  </span>
                </div>
                <div className='text-gray-500'>
                  {moment(payment.created).format('ddd, MMMM Do YYYY')}
                </div>
                <div>
                  <span
                    className={`p-1.5 text-xs font-medium uppercase tracking-wider rounded-lg bg-opacity-50 ${
                      payment.status === 'pending'
                        ? 'text-yellow-800 bg-yellow-200'
                        : payment.status === 'available'
                        ? 'text-green-800 bg-green-200'
                        : ''
                    }`}
                  >
                    {payment.status}
                  </span>
                </div>
              </div>
              <div className='text-sm text-gray-700'>{payment.description}</div>
              <div className='flex justify-between'>
                <div className='text-sm font-medium text-black'>
                  ${payment.amount}
                </div>
                <div className='text-sm font-medium text-black'>
                  ${payment.fee}
                </div>
                <div
                  className='text-lg font-bold'
                  style={{ color: payment.net >= 0 ? '#00df9a' : '#ff6666' }}
                >
                  ${payment.net}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Payments;
