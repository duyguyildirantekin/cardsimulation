namespace izmirimcardsimulation.Model.Common
{

    public class GenericResult<T>
    {
        public bool isSuccess { get; set; }
        public int errorCode { get; set; }
        public T data { get; set; }
        public string message { get; set; }

        public GenericResult(bool _isSuccess = false)
        {
            this.isSuccess = _isSuccess;
            if (!this.isSuccess)
            {
                this.errorCode = 0;
                this.message = "Failed";
            }

        }
    }
}