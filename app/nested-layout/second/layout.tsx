const SecondLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <p>Layout 2</p>
      {children}
      {/* 同階層のpage.tsxが渡されている */}
    </>
  )
}

export default SecondLayout
